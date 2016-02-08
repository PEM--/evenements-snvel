//
// const linkStyleOrange = {
//   content: {color: palette.primary2Color},
//   underline: {background: palette.primary2Color}
// };
//
// const linkStyleCream = {
//   content: {color: palette.alternateTextColor},
//   underline: {background: palette.alternateTextColor}
// };
//
// // import stylus from './AnimatedLink.styl';
//
// AnimatedLink = Radium(({children, to, isCream = false}) => {
//   const style = isCream ? linkStyleCream : linkStyleOrange;
//   return (
//     <RadiumizedLink
//       style={[
//         style.content, styles.lisibility
//       ]}
//       className={stylus.animatedLink} to={to}
//     >
//       <span>
//         <span>{children}</span>
//         <span style={[style.underline]}>&nbsp;</span>
//       </span>
//     </RadiumizedLink>
//   );
// });
