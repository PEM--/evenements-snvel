const outdatedBrowserRework = require('outdated-browser-rework');

outdatedBrowserRework({
  browserSupport: {
    Chrome: 48, // Includes Chrome for mobile devices
    IE: 11,
    Safari: 9,
    'Mobile Safari': 9,
    Firefox: 43
  },
  requireChromeOnAndroid: true,
  languagePath: '/outdatedbrowser/lang/fr.html'
});
