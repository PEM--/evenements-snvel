const serviceEmail = 'evenements-snvel@evenements-snvel.iam.gserviceaccount.com';

const { Utils, Col } = MainApp;

Object.assign(Utils, {
  importSpreadSheet(spreadsheetName, workSheet = 1) {
    console.log('Fetching data from Google Drive:', spreadsheetName);
    return Meteor.call(
      'spreadsheet/fetch2', spreadsheetName, String(workSheet),
      {email: serviceEmail}
    );
  }
});
