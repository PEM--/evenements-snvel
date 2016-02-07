import radium from 'radium';
import {palette, styles} from '../../../entry/client/styles/index';

const MaximizedContainer = radium(({children}) => (
  <div
    style={[
      styles.maximized
    ]}
  >
    {children}
  </div>
));

export default MaximizedContainer;
