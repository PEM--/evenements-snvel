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
