import React from 'react';
import {mount} from 'react-mounter';
import marked from '/imports/markdown';
import MainApp from '/imports/namespaces';

import Tracker from 'tracker-component';


console.log('Server and Client');

exposed = null;

if (Meteor.isClient) {
  exposed = window;
}

if (Meteor.isServer) {
  exposed = global;
}

exposed.marked = marked;
exposed.MainApp = MainApp;

Tests = new Mongo.Collection('tests');

if (Meteor.isServer) {
  if (Tests.find().count() === 0) {
    Tests.insert({title: 'Test 1'});
    Tests.insert({title: 'Test 2'});
  }
  Meteor.publish('tests', function() {
    return Tests.find({});
  });
}

const Layout = ({children}) => (
  <main>
    <h1>Main</h1>
    {children()}
  </main>
);

const List = ({name, tests = []}) => (
  <div>
    <h3>Content: {name}</h3>
    <ul>
      {
        tests.map((t, i) => <li key={i}>{t.title}</li>)
      }
    </ul>
  </div>
);

class ListModel extends Tracker.Component {
  constructor(props) {
    super(props);
    this.subscribe('tests');
    this.autorun(() => {
      this.setState({tests: Tests.find().fetch()});
    });
  }
  render() {
    const { children } = this.props;
    const { tests } = this.state;
    const childrenWithProps = React.Children.map(children, (child) =>
      React.cloneElement(child, { tests }));
    return (
      <div>
        <h2>ListModel</h2>
        { childrenWithProps }
      </div>
    );
  }
}

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(Layout, {
      children() {
        return (
          <ListModel>
            <List name='1st list' />
            <List name='2nd list' />
          </ListModel>
        );
      }
    });
  }
});
