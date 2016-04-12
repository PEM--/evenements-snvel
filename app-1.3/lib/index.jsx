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

Tests = new Mongo.Collection('tests');
TestsSchema = new SimpleSchema({
  title: { type: String, label: 'Titre' }
});
Tests.attachSchema(TestsSchema);

if (Meteor.isServer) {
  if (Tests.find().count() === 0) {
    Tests.insert({title: 'Test 1'});
    Tests.insert({title: 'Test 2'});
  }
  Meteor.publish('countedTests', function() {
    Counts.publish(this, 'counterTest', Tests.find());
  });
  Meteor.publish('tests', function() {
    return Tests.find({});
  });
}

if (Meteor.isClient) {
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

  class ListModel extends MainApp.Views.BaseReactComponent {
    constructor(props) {
      super(props);
      this.subscribe('tests');
      this.autorun(() => {
        this.setState({tests: Tests.find().fetch()});
      });
    }
  }
  FlowRouter.route('/tests', {
    name: 'tests',
    action() {
      mount(Layout, {
        children() {
          return (
            <div>
              <MainApp.Views.MeteorGriddle
                publication='countedTests'
                collection={Tests}
                matchingResultsCount='countedTests'
                filteredFields={['title']}
                columns={['title']}
              />
              <MainApp.Views.Select
                name='Toto' label='Titi'
                placeholder='Choose a Titi'
                value={1} options={[{value: 1, label: 'One'}, {value: 2, label: 'Two'}]}
                onChange={e => console.log(e)}
              />
              <ListModel>
                <List name='1st list' />
                <List name='2nd list' />
              </ListModel>
            </div>
          );
        }
      });
    }
  });

}
