import radium from 'radium';
import {palette, styles} from '../../../entry/client/styles/index';

import MaximizedContainer from './MaximizedContainer';

const Header = radium(() => (
  <div
    style={[
      styles.flexItemStaticSize,
      {
        background: 'white'
      }
    ]}
  >
    <MaximizedContainer>
      <h1>Header</h1>
    </MaximizedContainer>
  </div>
));

export default Header;
