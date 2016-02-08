// Shared colors
const darkViolet = '#262a3f';
const violet = '#4a418f';
const lightViolet = '#a090e8';
const orange = '#ee7a23';
const cream = '#fff8e4';

// Colors for Material-UI
palette = {
  primary1Color: darkViolet,
  primary2Color: orange,
  primary3Color: lightViolet,
  accent1Color: orange,
  accent2Color: cream,
  accent3Color: lightViolet,
  textColor: darkViolet,
  alternateTextColor: cream,
  canvasColor: cream,
  borderColor: lightViolet,
  // disabledColor: ColorManipulator.fade(lightViolet, 0.3)
};
// muiTheme = getMuiTheme({
//   fontFamily: 'Helvetica Neue, Roboto, Arial, sans-serif',
//   palette
// }, {
//   avatar: { borderColor: null }
// });
// if (Meteor.isClient) {
//   muiTheme.userAgent = navigator.userAgent;
// }

// Styles for inline styles and Radium
styles = {
  maximized: {
    maxWidth: '960px',
    width: '100%',
    margin: '0 auto'
  },
  transparent: {opacity: 0},
  primary2Color: {
    background: orange,
    color: cream
  },
  whiteColor: {
    background: cream,
    color: darkViolet
  },
  // Simple directive
  textCenter: { textAlign: 'center' },
  clickable: { cursor: 'pointer' },
  // Enhanced lisibility
  lisibility: { textShadow: '0 0 1px black' },
  // Flexbox styles
  flex: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    col: {flexDirection: 'column'},
    row: {flexDirection: 'row'}
  },
  flexItemStaticSize: {flex: '0 0 auto'},
  flexItemDynamicSize: {flex: '1 0 auto'}
};