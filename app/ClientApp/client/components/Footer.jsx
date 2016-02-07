import radium from 'radium';
import {palette, styles} from '../../../entry/client/styles/index';

import FontAwesome from 'react-fontawesome';
const Icon = radium(FontAwesome);

import MaximizedContainer from './MaximizedContainer';

const Footer = radium(() => (
  <div
    style={[
      styles.flexItemStaticSize,
      styles.primary2Color
    ]}
  >
    <MaximizedContainer>
      <h1 style={[styles.lisibility]}>Footer</h1>
      <Icon name='rocket' size='2x' spin style={[styles.lisibility]} />
    </MaximizedContainer>
  </div>
));

export default Footer;
