import radium from 'radium';
import {palette, styles} from '../../../entry/client/styles/index';

import MaximizedContainer from './MaximizedContainer';

const Footer = radium(() => (
  <div
    style={[
      styles.flexItemStaticSize,
      {
        background: palette.primary2Color
      }
    ]}
  >
    <MaximizedContainer>
      <h1>Footer</h1>
    </MaximizedContainer>
  </div>
));

export default Footer;
