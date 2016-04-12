import React from 'react';
import {mount} from 'react-mounter';
import marked from '/imports/markdown';
import MainApp from '/imports/namespaces';

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

const Layout = ({children}) => (
  <main>
    <h1>Main</h1>
    {children}
  </main>
);


FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(Layout, {children: (<h2>Children</h2>)});
  }
});
