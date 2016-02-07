import radium from 'radium';
import {palette, styles} from '../../../entry/client/styles/index';

import FloatingActionButton from 'material-ui/lib/floating-action-button';

import MaximizedContainer from './MaximizedContainer';

const Header = radium(() => (
  <div
    style={[
      styles.flexItemStaticSize,
      styles.whiteColor
    ]}
  >
    <MaximizedContainer>
      <div
        style={[
          styles.flex,
          styles.row,
        ]}
      >
        <div style={[styles.flexItemDynamicSize]}><h1>Header</h1></div>
        <div style={[styles.flexItemStaticSize]}>
          <FloatingActionButton />
        </div>
      </div>
    </MaximizedContainer>
  </div>
));

export default Header;
