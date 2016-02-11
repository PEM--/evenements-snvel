System.import('{universe:react-widgets}').then(ReactWidgets => {
  // use widgets over here, e.g.
  Calendar = ReactWidgets.Calendar;
  console.log('Widgets are ready');
});

const Tests = () => {
  console.log('Test component');
  DocHead.setTitle('Test component');
  return (
    <div className='MainContent maximized'>
      <Button>Test</Button>
      <Calendar defaultValue={new Date()} />
    </div>
  );
};

FlowRouter.route('/ctests', {
  name: 'ctests',
  action() {
    console.log('Tests route');
    ReactLayout.render(MainApp.Views.MainLayout, {
      children: <Tests />
    });
  }
});
