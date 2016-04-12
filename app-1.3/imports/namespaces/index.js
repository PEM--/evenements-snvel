import React from 'react';
import Tracker from 'tracker-component';

let MainApp = {
  Col: {},
  Schema: {},
  Utils: {},
  Views: {
    BaseReactComponent: class BaseReactComponent extends Tracker.Component {
      constructor(props) {
        super(props);
      }
      cloneWithProps(el) {
        return React.cloneElement(el, { ...this.state });
      }
      render() {
        const { children } = this.props;
        const count = React.Children.count(children);
        if (count === 1) {
          return this.cloneWithProps(children);
        }
        return (
          <div>
            {
              React.Children.map(children, child => this.cloneWithProps(child))
            }
          </div>
        );
      }
    }
  }
};

export default MainApp;
