import radium from 'radium';
import { Link } from 'react-router';
const RadiumizedLink = radium(Link);

const linkStyle = {
  fontWeight: 'bold',
  color: 'green'
};
// transition color .3s ease-in-out
// position relative
// color pink
// &::after
//   content ' '
//   position absolute
//   bottom -.25em
//   left 0
//   width 100%
//   background-color pink
//   height 1px
//   transform scale3d(0, 1, 1)
//   transition transform .3s ease-in-out
// // Animated underline links
// &:hover
//   &::after
//     transform scale3d(1, 1, 1)
// a.animated-link, a.animated-link:visited

const AnimatedLink = ({children, to}) => (
  <RadiumizedLink
    to={to}
    style={[
      linkStyle,
      {textDecoration: 'none'}
    ]}
  >
    <span>
      <span>
        {children}
      </span>
      <span />
    </span>
  </RadiumizedLink>
);

export default AnimatedLink;
