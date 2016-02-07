import radium from 'radium';
import {palette, styles} from '../../../entry/client/styles/index';

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
      <div style={[
        styles.flex, styles.row,
        {justifyContent: 'center'}
      ]}>
        <div style={[
          styles.flexItemDynamicSize
        ]}>
          <div style={{
            width: '120px',
            margin: '4px auto 0 auto'
          }}>
            <img src='/img/snvel.svg' width='120px' height='48px' alt='Logo SNVEL'/>
          </div>
        </div>
        <div style={[
          styles.flexItemStaticSize,
          {margin: '12px 0', cursor: 'pointer'}
        ]}>
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
