const Tests = () => {
  console.log('Test component');
  DocHead.setTitle('Test component');
  return (
    <div className='MainContent maximized'>
      <hr />
      <h1 className='lisibility'>Typography</h1>
      <h2 className='lisibility'>Header2</h2>
      <p className='lisibility'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <h1 className='lisibility'>Forms</h1>
    <form>
      <fieldset>
        <label htmlFor='inputText'>Enter your text here: </label>
        <input id='inputText' type='text' placeholder='Enter your text here' />
      </fieldset>
      <button type='submit'>Submit</button>
    </form>
    <table>
      <thead>
        <tr>
        <th>
          Header 1
        </th>
        <th>
          Header 2
        </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Content 1 - 1</td>
          <td>Content 1 - 2</td>
        </tr>
        <tr>
          <td>Content 2 - 1</td>
          <td>Content 2 - 2</td>
        </tr>

      </tbody>
      <tfoot>
        <tr>
          <td>Content 2 - 1</td>
          <td>Content 2 - 2</td>
        </tr>

      </tfoot>
    </table>
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
