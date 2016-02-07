import radium from 'radium';
import {palette, styles} from '../../../entry/client/styles/index';

import FontAwesome from 'react-fontawesome';

import MaximizedContainer from './MaximizedContainer';

const Footer = radium(() => (
  <div
    style={[
      styles.flexItemStaticSize,
      styles.primary2Color
    ]}
  >
    <MaximizedContainer>
      <h1>Footer</h1>
      <FontAwesome name='rocket' size='2x' spin />
    </MaximizedContainer>
  </div>
));

export default Footer;
