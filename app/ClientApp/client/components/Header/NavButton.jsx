// Extracted from: https://github.com/plouc/react-svg-buttons

import React, {PropTypes} from 'react';
import tweenState, {easingTypes, stackBehavior} from 'react-tween-state';

function pathCommand(instruction) {
  return `${ instruction.command } ${ instruction.x } ${ instruction.y }`;
}

function pathCommands(instructions) {
  return instructions.map(pathCommand).join(' ');
}

function computeValues(completion, props) {
  let {size, thickness} = props;

  let originX = size / 2;
  let radius = size / 2 - thickness;
  let circumference = 2 * radius * Math.PI;

  return {
    circleDashOffset: circumference * completion,
    circleRotation: 180 + 180 * completion,
    leftPathRotation: 45 - 45 * completion,
    rightPathRotation: 45 - 45 * completion,
    rightPathX: originX - radius * 0.7 * completion,
    rightPathStartX: radius * 0.4 * completion,
    rightPathStartY: radius * -0.7 + radius * 0.3 * completion,
    rightPathEndX: radius * 0.4 * completion,
    rightPathEndY: radius * 0.7 + radius * -0.3 * completion
  };
}

export default React.createClass({
  displayName: 'BackButton',

  propTypes: {
    size: PropTypes.number.isRequired,
    thickness: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    transitionDuration: PropTypes.number.isRequired,
    outline: PropTypes.bool.isRequired
  },

  mixins: [tweenState.Mixin],

  getDefaultProps() {
    return {size: 52, thickness: 2, color: '#000', transitionDuration: 1600, outline: true};
  },

  getInitialState() {
    return {completion: 0};
  },

  onMouseEnter() {
    let {transitionDuration} = this.props;

    this.tweenState('completion', {
      easing: easingTypes.easeOutElastic,
      stackBehavior: stackBehavior.ADDITIVE,
      duration: transitionDuration,
      endValue: 1
    });
  },

  onMouseLeave() {
    let {transitionDuration} = this.props;

    this.tweenState('completion', {
      easing: easingTypes.easeInQuad,
      stackBehavior: stackBehavior.ADDITIVE,
      duration: transitionDuration / 8,
      endValue: 0
    });
  },

  render() {
    let {size, thickness, color, outline} = this.props;

    let originX = size / 2;
    let originY = size / 2;
    let radius = size / 2 - thickness;
    let circumference = 2 * radius * Math.PI;

    let values = computeValues(this.getTweeningValue('completion'), this.props);

    let {
      circleDashOffset,
      circleRotation,
      leftPathRotation,
      rightPathRotation,
      rightPathX,
      rightPathStartX,
      rightPathStartY,
      rightPathEndX,
      rightPathEndY
    } = values;

    let leftPathLine = pathCommands([
      {
        command: 'M',
        x: radius * -0.7,
        y: 0
      }, {
        command: 'L',
        x: radius * 0.7,
        y: 0
      }
    ]);

    let rightPathLine = pathCommands([
      {
        command: 'M',
        x: rightPathStartX,
        y: rightPathStartY
      }, {
        command: 'L',
        x: 0,
        y: 0
      }, {
        command: 'L',
        x: rightPathEndX,
        y: rightPathEndY
      }
    ]);

    let circle = null;
    if (outline === true) {
      circle = (
        <g transform={`translate(${originX}, ${originY}) rotate(${circleRotation}, 0, 0)`}>
          <circle fill="none" stroke={color} strokeWidth={thickness} r={radius} style={{
            strokeDasharray: circumference,
            strokeDashoffset: `${circleDashOffset}`
          }}/>
        </g>
      );
    }

    return (
      <span className="back_button">
        <svg width={size} height={size} xmlns="http://www.w3.org/svg/2000" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          {circle}
          <g transform={`translate(${originX}, ${originY}) rotate(${leftPathRotation}, 0, 0)`}>
            <path fill="none" stroke={color} strokeWidth={thickness} d={leftPathLine}/>
          </g>
          <g transform={`translate(${rightPathX}, ${originY}) rotate(${rightPathRotation}, 0, 0)`}>
            <path fill="none" stroke={color} strokeWidth={thickness} d={rightPathLine}/>
          </g>
        </svg>
      </span>
    );
  }
});
