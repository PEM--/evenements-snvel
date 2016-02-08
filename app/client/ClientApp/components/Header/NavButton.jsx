// Extracted from: https://github.com/plouc/react-svg-buttons

// import React, {PropTypes} from 'react';
// import tweenState, {easingTypes, stackBehavior} from 'react-tween-state';
//
// function pathCommand(instruction) {
//   return `${ instruction.command } ${ instruction.x } ${ instruction.y }`;
// }
//
// function pathCommands(instructions) {
//   return instructions.map(pathCommand).join(' ');
// }
//
// function computeValues(completion, props) {
//     let { size, thickness } = props;
//
//     let originX       = size / 2;
//     let originY       = size / 2;
//     let radius        = size / 2 - thickness;
//     let circumference = 2 * radius * Math.PI;
//
//     return {
//         circleDashOffset:   circumference * completion,
//         circleRotation:     -90 + 180 * completion,
//         firstBarY:          originY - radius * 0.3 * (1 - completion),
//         firstBarRotation:   45 * completion,
//         secondBarMidLength: radius * 0.5 - completion * radius * 0.5,
//         thirdBarY:          originY + radius * 0.3 * (1 - completion),
//         thirdBarRotation:   -45 * completion,
//         barMidLength:       radius * 0.5 + completion * radius * 0.2
//     };
// }
//
//
// export default React.createClass({
//     displayName: 'NavButton',
//
//     propTypes: {
//         size:               PropTypes.number.isRequired,
//         thickness:          PropTypes.number.isRequired,
//         color:              PropTypes.string.isRequired,
//         transitionDuration: PropTypes.number.isRequired,
//         outline:            PropTypes.bool.isRequired
//     },
//
//     mixins: [tweenState.Mixin],
//
//     getDefaultProps() {
//         return {
//             size:               52,
//             thickness:          2,
//             color:              '#000',
//             transitionDuration: 1600,
//             outline:            true
//         };
//     },
//
//     getInitialState() {
//         return {
//             completion: 0
//         };
//     },
//
//     onClick() {
//         let { transitionDuration } = this.props;
//         let { completion } = this.state;
//
//         this.tweenState('completion', {
//             easing:        easingTypes.easeOutElastic,
//             stackBehavior: stackBehavior.ADDITIVE,
//             duration:      transitionDuration,
//             endValue:      completion === 1 ? 0 : 1
//         });
//     },
//
//     render() {
//         let { size, thickness, color, outline } = this.props;
//
//         let originX       = size / 2;
//         let originY       = size / 2;
//         let radius        = size / 2 - thickness;
//         let circumference = 2 * radius * Math.PI;
//
//         let completion = this.getTweeningValue('completion');
//         let values     = computeValues(completion, this.props);
//
//         let {
//             circleDashOffset, circleRotation,
//             firstBarY, thirdBarY,
//             barMidLength, secondBarMidLength,
//             firstBarRotation, thirdBarRotation
//         } = values;
//
//         let firstBarLine = pathCommands([
//             { command: 'M', x: -barMidLength, y: 0 },
//             { command: 'L', x:  barMidLength, y: 0 }
//         ]);
//
//         let secondBarLine = pathCommands([
//             { command: 'M', x: -secondBarMidLength, y: 0 },
//             { command: 'L', x:  secondBarMidLength, y: 0 }
//         ]);
//
//         let thirdBarLine = pathCommands([
//             { command: 'M', x: -barMidLength, y: 0 },
//             { command: 'L', x:  barMidLength, y: 0 }
//         ]);
//
//         let circle = null;
//         if (outline === true) {
//             circle = (
//                 <g transform={`translate(${ originX }, ${ originY }) rotate(${ circleRotation }, 0, 0)`}>
//                     <circle
//                         fill="none" stroke={color} strokeWidth={thickness} r={radius}
//                         style={{ strokeDasharray: circumference, strokeDashoffset: `${ circleDashOffset }`}}
//                     />
//                 </g>
//             );
//         }
//
//         return (
//             <span className="plus_button">
//                 <svg
//                     width={size} height={size} xmlns="http://www.w3.org/svg/2000"
//                     onClick={this.onClick}
//                 >
//                     {circle}
//                     <g transform={`translate(${ originX }, ${ firstBarY }) rotate(${ firstBarRotation }, 0, 0)`}>
//                         <path fill="none" stroke={color} strokeWidth={thickness} d={firstBarLine} />
//                     </g>
//                     <g transform={`translate(${ originX }, ${ originY }) rotate(0, 0, 0)`}>
//                         <path fill="none" stroke={color} strokeWidth={thickness} d={secondBarLine} />
//                     </g>
//                     <g transform={`translate(${ originX }, ${ thirdBarY }) rotate(${ thirdBarRotation }, 0, 0)`}>
//                         <path fill="none" stroke={color} strokeWidth={thickness} d={thirdBarLine} />
//                     </g>
//                 </svg>
//             </span>
//         );
//     }
// });
