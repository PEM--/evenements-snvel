Package.describe({
  summary: "Google Spreadsheets",
  name: "ongoworks:google-spreadsheets",
  version: "0.5.8",
  git: "https://github.com/ongoworks/meteor-google-spreadsheets"
});

Npm.depends({
  "google-spreadsheets": "0.5.1",
  "googleclientlogin": "0.2.8",
  "edit-google-spreadsheet": "0.2.21"
});

Package.on_use(function (api) {
  api.versionsFrom("METEOR@1.2.1");
  api.imply(["underscore"], ["server"]);
  api.use("check");
  api.export(['GoogleSpreadsheets', 'GoogleClientLogin', 'GASpreadsheet'], 'server');
  api.addFiles('server/methods.js', 'server');
  api.addFiles('google-spreadsheets.js', 'server');
});
