import radium from 'radium';
import {palette, styles} from '../../../entry/client/styles/index';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import { NavButton } from 'react-svg-buttons';

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
          <NavButton
            size={40}
            thickness={2}
            outline={true}
            color={palette.primary1Color}
            transitionDuration={1200}
          />
        </div>
      </div>
    </MaximizedContainer>
  </div>
));

export default Header;
