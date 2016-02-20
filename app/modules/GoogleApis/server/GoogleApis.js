const { Utils, Col } = MainApp;

GoogleKey = JSON.parse(Assets.getText(Meteor.settings.private.googleApi.jsonKey));

const path = Meteor.npmRequire('path');
const Future = Meteor.npmRequire(path.join('fibers', 'future'));

EditGoogleSpreadsheet = Meteor.npmRequire('edit-google-spreadsheet');
GoogleApis = Meteor.npmRequire('googleapis');
GoogleAuth = Meteor.npmRequire('google-auth-library');

const SCOPES = ['https://www.googleapis.com/auth/drive', 'https://spreadsheets.google.com/feeds'];
jwtClient = new GoogleApis.auth.JWT(GoogleKey.client_email, null, GoogleKey.private_key, SCOPES, null);

authorize = () => {
  const fut = new Future();
  let needAuthorize = jwtClient.gtoken ? false : true;
  if (needAuthorize) {
    console.log('Token not ready, request one...');
    jwtClient.authorize((err, tokens) => {
      if (err) {
        console.warn('Error while getting an authorization token', err);
        return fut.return(false);
      }
      console.log('Token create with expiry at', moment(jwtClient.gtoken.expires_at).format('DD/MM/YYYY HH:mm:ss'));
      return fut.return(jwtClient.gtoken.raw_token);
    });
    return fut.wait();
  }
  jwtClient.refreshAccessToken((err, tokens) => {
    if (err) {
      console.warn('Error while refreshing token', err);
      return fut.return(false);
    }
    console.log('Token refreshed with expiry at', moment(jwtClient.gtoken.expires_at).format('DD/MM/YYYY HH:mm:ss'));
    return fut.return(jwtClient.gtoken.raw_token);
  });
  return fut.wait();
};

Object.assign(Utils, {
  importSpreadSheet(spreadsheetName, workSheet = 1) {
    const token = authorize();
    console.log('Fetching data from Google Drive:', spreadsheetName);
    const fut = new Future();
    EditGoogleSpreadsheet.load({
      spreadsheetName: spreadsheetName,
      worksheetId: String(workSheet),
      accessToken: {
        type: token.token_type,
        token: token.access_token
      }
    }, function sheetReady(err, spreadsheet) {
      if (err) {
        console.warn(err);
        fut.return(false);
        return;
      }
      spreadsheet.receive(function(errReceive, rows, info) {
        if (errReceive) {
          console.warn(err);
          fut.return(false);
        } else {
          fut.return({rows: rows, info: info});
        }
      });
    });
    return fut.wait();
  },
  exportSpreadSheet(spreadsheetName, workSheet = 1) {
    const token = authorize();
    const fut = new Future();
    EditGoogleSpreadsheet.load({
      spreadsheetName: spreadsheetName,
      worksheetId: String(workSheet),
      accessToken: {
        type: token.token_type,
        token: token.access_token
      }
    }, function sheetReady(err, spreadsheet) {
      if (err) {
        console.warn(err);
        fut.return(false);
        return;
      }
      spreadsheet.add(updateObject);
      spreadsheet.send(function(errSend) {
        if (err) {
          console.warn(errSend);
          return fut.return(false);
        }
        return fut.return(true);
      });
    });
    return fut.wait();
  },
  getDriveFile(fileName = 'Evènements SNVEL - Mentions légales') {
    const fut = new Future();
    const drive = GoogleApis.drive('v3');
    drive.files.list({
      auth: jwtClient
    }, (err, list) => {
      if (err) {
        console.warn('Error extracting list', errSend);
        return fut.return(false);
      }
      const item = list.files.find(l => l.name === fileName);
      drive.files.get({
        fileId: item.id, alt: 'media', auth: jwtClient
      }, (errGet, content) => {
        if (errGet) {
          console.warn('Error getting file', fileName, 'with', errGet);
          return fut.return(false);
        }
        return fut.return(content);
      });
    });
    return fut.wait();
  }
});
