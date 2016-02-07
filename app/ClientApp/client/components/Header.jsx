import radium from 'radium';
import {palette, styles} from '../../../entry/client/styles/index';

import MaximizedContainer from './MaximizedContainer';

const Header = radium(() => (
  <div
    style={[
      styles.flexItemStaticSize,
      styles.whiteColor
    ]}
  >
    <MaximizedContainer>
      <h1>Header</h1>
    </MaximizedContainer>
  </div>
));

export default Header;
