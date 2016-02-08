import radium from 'radium';
import {palette, styles} from '../../../entry/client/styles/index';

import FontAwesome from 'react-fontawesome';
const Icon = radium(FontAwesome);

import AnimatedLink from './AnimatedLink';
import MaximizedContainer from './MaximizedContainer';

const Footer = radium(() => (
  <div
    style={[
      styles.flexItemStaticSize, styles.primary2Color,
      {padding: '20px 0', fontSize: '90%'}
    ]}
    className='animated fadeInUp'
  >
    <MaximizedContainer>
      <div style={[
        styles.flex, styles.flex.row, {flexWrap: 'wrap'}
      ]}>
        <div style={[
          styles.flexItemDynamicSize, styles.flex, styles.flex.row,
          {
            justifyContent: 'space-between',
            marginRight: '100px'
          }
        ]}>
          <AnimatedLink to='/legal-mentions' isCream={true}>Mentions légales</AnimatedLink>
          <AnimatedLink to='/cookies' isCream={true}>Confidentialité</AnimatedLink>
          <AnimatedLink to='/cgv' isCream={true}>Conditions de ventes</AnimatedLink>
        </div>
        <div style={[
          styles.flexItemStaticSize,
          styles.flex, styles.flex.row,
          {
            justifyContent: 'space-between',
            minWidth: '120px'
          }
        ]}>
          <Icon name='twitter' size='lg' style={[styles.flexItemStaticSize, styles.lisibility]} />
          <Icon name='facebook' size='lg' style={[styles.flexItemStaticSize, styles.lisibility]} />
          <Icon name='linkedin' size='lg' style={[styles.flexItemStaticSize, styles.lisibility]} />
          <Icon name='envelope' size='lg' style={[styles.flexItemStaticSize, styles.lisibility]} />
        </div>
      </div>
    </MaximizedContainer>
  </div>
));

export default Footer;
