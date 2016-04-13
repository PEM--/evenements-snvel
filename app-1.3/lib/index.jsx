import React from 'react';
import {mount} from 'react-mounter';
import marked from '/imports/markdown';
import MainApp from '/imports/namespaces';
import routerStart from '/imports/routerStart';

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
routerStart();
