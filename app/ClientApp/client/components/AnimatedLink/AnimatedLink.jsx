import radium from 'radium';
import { styles, palette } from '../../../../entry/client/styles';
import { Link } from 'react-router';
const RadiumizedLink = radium(Link);

const linkStyleOrange = {
  content: {color: palette.primary2Color},
  underline: {background: palette.primary2Color}
};

const linkStyleCream = {
  content: {color: palette.alternateTextColor},
  underline: {background: palette.alternateTextColor}
};

import stylus from './AnimatedLink.styl';

const AnimatedLink = radium(({children, to, isCream = false}) => {
  console.log('isCream', isCream);
  const style = isCream ? linkStyleCream : linkStyleOrange;
  return (
    <RadiumizedLink
      style={[
        style.content, styles.lisibility
      ]}
      className={stylus.animatedLink} to={to}
    >
      <span>
        <span>{children}</span>
        <span style={[style.underline]}>&nbsp;</span>
      </span>
    </RadiumizedLink>
  );
});

export default AnimatedLink;
