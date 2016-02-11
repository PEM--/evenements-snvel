// Extracted from: https://github.com/malte-wessel/react-textfit

// Calculate height without padding.
const innerHeight = (el) => {
  const style = window.getComputedStyle(el, null);
  return el.clientHeight -
    parseInt(style.getPropertyValue('padding-top'), 10) -
    parseInt(style.getPropertyValue('padding-bottom'), 10);
};

// Calculate width without padding.
const innerWidth = (el) => {
  const style = window.getComputedStyle(el, null);
  return el.clientWidth -
    parseInt(style.getPropertyValue('padding-left'), 10) -
    parseInt(style.getPropertyValue('padding-right'), 10);
};

function series(tasks, cb) {
  const results = [];
  let current = 0;
  let isSync = true;

  function done(err) {
    function end() {
      if (cb) cb(err, results);
    }
    if (isSync) Meteor.defer(end);
    else end();
  }

  function each(err, result) {
    results.push(result);
    if (++current >= tasks.length || err) done(err);
    else tasks[current](each);
  }

  if (tasks.length > 0) tasks[0](each);
  else done(null);

  isSync = false;
}

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty;
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) ||
      objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function throttle(func, wait) {
  let ctx;
  let args;
  let rtn;
  let timeoutID;
  let last = 0;

  function call() {
    timeoutID = 0;
    last = +new Date();
    rtn = func.apply(ctx, args);
    ctx = null;
    args = null;
  }

  return function throttled() {
    ctx = this;
    args = arguments;
    const delta = new Date() - last;
    if (!timeoutID) {
      if (delta >= wait) call();
      else timeoutID = setTimeout(call, wait - delta);
    }
    return rtn;
  };
}

let uid = 0;

function uniqueId() {
  return uid++;
}

const noop = () => {};

function whilst(test, iterator, callback = noop) {
  if (test()) {
    iterator(function next(err, ...args) {
      if (err) {
        callback(err);
      } else if (test.apply(this, args)) {
        iterator(next);
      } else {
        callback(null);
      }
    });
  } else {
    callback(null);
  }
}


const { createClass, PropTypes } = React;
const { findDOMNode } = ReactDOM;

function assertElementFitsWidth(el, width) {
  // -1: temporary bugfix, will be refactored soon
  return el.scrollWidth - 1 <= width;
}

function assertElementFitsHeight(el, height) {
  // -1: temporary bugfix, will be refactored soon
  return el.scrollHeight - 1 <= height;
}


Textfit = createClass({

  displayName: 'Textfit',

  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    text: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    mode: PropTypes.oneOf([
      'single', 'multi'
    ]),
    forceSingleModeWidth: PropTypes.bool,
    perfectFit: PropTypes.bool,
    throttle: PropTypes.number,
    onReady: PropTypes.func
  },

  getDefaultProps() {
    return {
      min: 1,
      max: 300,
      mode: 'multi',
      forceSingleModeWidth: true,
      perfectFit: true,
      throttle: 50,
      autoResize: true,
      onReady: noop
    };
  },

  getInitialState() {
    return {
      fontSize: null,
      ready: false
    };
  },

  componentWillMount() {
    this.handleWindowResize = throttle(this.handleWindowResize, this.props.throttle);
  },

  componentDidMount() {
    const {
      autoResize
    } = this.props;
    if (autoResize) {
      window.addEventListener('resize', this.handleWindowResize);
    }
    this.process();
  },

  componentDidUpdate(prevProps) {
    const {
      ready
    } = this.state;
    if (!ready) return;
    if (shallowEqual(this.props, prevProps)) return;
    this.process();
  },

  componentWillUnmount() {
    const {
      autoResize
    } = this.props;
    if (autoResize) {
      window.removeEventListener('resize', this.handleWindowResize);
    }
    // Setting a new pid will cancel all running processes
    this.pid = uniqueId();
  },

  handleWindowResize() {
    this.process();
  },

  process() {
    const {
      min,
      max,
      mode,
      forceSingleModeWidth,
      perfectFit,
      onReady
    } = this.props;
    const el = findDOMNode(this);
    const {
      wrapper
    } = this.refs;

    const originalWidth = innerWidth(el);
    const originalHeight = innerHeight(el);

    if (originalHeight <= 0) {
      console.warn('Can not process element without height. Make sure the element is displayed and has a static height.');
      return;
    }

    if (originalWidth <= 0) {
      console.warn('Can not process element without width. Make sure the element is displayed and has a static width.');
      return;
    }

    const pid = uniqueId();
    this.pid = pid;

    const shouldCancelProcess = () => pid !== this.pid;

    const testPrimary = mode === 'multi' ? () => assertElementFitsHeight(wrapper, originalHeight) : () => assertElementFitsWidth(wrapper, originalWidth);

    const testSecondary = mode === 'multi' ? () => assertElementFitsWidth(wrapper, originalWidth) : () => assertElementFitsHeight(wrapper, originalHeight);

    let mid;
    let low = min;
    let high = max;

    this.setState({
      ready: false
    });

    series([
      // Step 1:
      // Binary search to fit the element's height (multi line) / width (single line)
      stepCallback => whilst(
        () => low <= high,
        whilstCallback => {
          if (shouldCancelProcess()) return whilstCallback(true);
          mid = parseInt((low + high) / 2, 10);
          this.setState({
            fontSize: mid
          }, () => {
            if (shouldCancelProcess()) return whilstCallback(true);
            if (testPrimary()) low = mid + 1;
            else high = mid - 1;
            return whilstCallback();
          });
        },
        stepCallback
      ),
      // Step 2:
      // Binary search to fit the element's width (multi line) / height (single line)
      // If mode is single and forceSingleModeWidth is true, skip this step
      // in order to not fit the elements height and decrease the width
      stepCallback => {
        if (mode === 'single' && forceSingleModeWidth) return stepCallback();
        if (testSecondary()) return stepCallback();
        low = min;
        high = mid;
        return whilst(
          () => low <= high,
          whilstCallback => {
            if (shouldCancelProcess()) return whilstCallback(true);
            mid = parseInt((low + high) / 2, 10);
            this.setState({
              fontSize: mid
            }, () => {
              if (pid !== this.pid) return whilstCallback(true);
              if (testSecondary()) low = mid + 1;
              else high = mid - 1;
              return whilstCallback();
            });
          },
          stepCallback
        );
      },
      // Step 3
      // Sometimes the text still overflows the elements bounds.
      // If perfectFit is true, decrease fontSize until it fits.
      stepCallback => {
        if (!perfectFit) return stepCallback();
        if (testPrimary()) return stepCallback();
        whilst(
          () => !testPrimary(),
          whilstCallback => {
            if (shouldCancelProcess()) return whilstCallback(true);
            this.setState({
              fontSize: --mid
            }, whilstCallback);
          },
          stepCallback
        );
      },
      // Step 4
      // Make sure fontSize is always greater than 0
      stepCallback => {
        if (mid > 0) return stepCallback();
        mid = 1;
        this.setState({
          fontSize: mid
        }, stepCallback);
      }
    ], err => {
      // err will be true, if another process was triggered
      if (err) return;
      this.setState({
        ready: true
      }, () => onReady(mid));
    });
  },

  render() {
    const { children, text, style, min, max, mode, ...props } = this.props;
    const { fontSize, ready } = this.state;
    const finalStyle = { ...style, fontSize: fontSize };

    const wrapperStyle = {
      display: ready ? 'block' : 'inline-block'
    };
    if (mode === 'single') wrapperStyle.whiteSpace = 'nowrap';

    return (
      <div style={finalStyle} {...props}>
        <span ref="wrapper" style={wrapperStyle}>
          { text && typeof children === 'function' ? ready ? children(text) : text : children}
        </span>
      </div>
    );
  }
});
