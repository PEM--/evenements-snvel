import mainStyles from './main.styl';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

const darkViolet = '#262a3f';
const violet = '#4a418f';
const lightViolet = '#a090e8';
const orange = '#ee7a23';
const cream = '#fff8e4';

const palette = {
  primary1Color: darkViolet,
  primary2Color: orange,
  primary3Color: orange,
  accent1Color: orange,
  accent2Color: cream,
  accent3Color: lightViolet,
  textColor: darkViolet,
  alternateTextColor: cream,
  canvasColor: cream,
  borderColor: lightViolet,
  disabledColor: ColorManipulator.fade(lightViolet, 0.3)
};

let muiTheme = getMuiTheme({ palette }, {
  avatar: { borderColor: null }
});
if (Meteor.isClient) {
  muiTheme.userAgent = navigator.userAgent;
}

export {
  muiTheme,
  palette
};
