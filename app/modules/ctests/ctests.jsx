const { Button } = MainApp.Views;

const Tests = () => {
  console.log('Test component');
  DocHead.setTitle('Test component');
  return (
    <div className='MainContent maximized'>
      <h1 className='lisibility'>Typography</h1>
      <p className='lisibility'>Repeated paragraphs.</p>
      <p className='lisibility'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h2 className='lisibility'>Header2</h2>
      <p className='lisibility'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h3 className='lisibility'>Header3</h3>
      <p className='lisibility'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h4 className='lisibility'>Header4</h4>
      <p className='lisibility'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h5 className='lisibility'>Header5</h5>
      <p className='lisibility'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h6 className='lisibility'>Header6</h6>
      <p className='lisibility'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h2 className='lisibility'>Lists</h2>
      <h3 className='lisibility'>Unordered lists</h3>
      <ul className='lisibility'>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
      </ul>
      <h3 className='lisibility'>Ordered lists</h3>
      <ol className='lisibility'>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
      </ol>
    <hr />
    <h1 className='lisibility'>Forms</h1>
    <h2>Basic form</h2>
    <form>
      <fieldset>
        <div className='fieldsContainer'>
          <div className='formGroup'>
            <label htmlFor='inputText'>Enter your text here: </label>
            <input id='inputText' type='text' placeholder='Enter your text here' />
            <span className='errorText'>This field is mandatory</span>
          </div>
          <div className='formGroup'>
            <label htmlFor='inputEmail'>Enter your email here: </label>
            <input id='inputEmail' type='email' placeholder='Enter your email here' />
            <span className='errorText'>This field is mandatory</span>
          </div>
          <div className='formGroup'>
            <label htmlFor='inputPassword'>Enter your password here: </label>
            <input id='inputPassword' type='password' placeholder='Enter your password here' />
            <span className='errorText'>This field is mandatory</span>
          </div>
        </div>
        <input id='checkbox' type='checkbox' />
        <label htmlFor='checkbox'>Opt-in checkbox</label>
        <label htmlFor='radio'>Select among these choices</label>
        <input id='radio1' type='radio' name='radio' value='choice1' />
        <label htmlFor='radio1'>Choice 1</label>
        <input id='radio2' type='radio' name='radio' value='choice2' />
        <label htmlFor='radio2'>Choice 2</label>
        <input id='radio3' type='radio' name='radio' value='choice2' />
        <label htmlFor='radio3'>Choice 3</label>
      </fieldset>
      <fieldset className='multiline'>
        <label htmlFor='inputInline'>Enter your date here: </label>
        <input id='inputInline' type='date' placeholder='Enter your date here' />
      </fieldset>
      <Button iconName='times'>
        Default Submit
      </Button>
      <Button iconName='shopping-cart' isDisabled={true}>
        Default disabled submit
      </Button>
      <Button isPrimary={true}>
        Primary submit
      </Button>
      <Button isPrimary={true} isDisabled={true}>
        Primary disabled submit
      </Button>
    </form>
    <h2>Error form</h2>
    <form >
      <fieldset>
        <div className='fieldsContainer'>
          <div className='formGroup error'>
            <label htmlFor='inputText'>Enter your text here: </label>
            <input id='inputText' type='text' placeholder='Enter your text here' />
            <span className='errorText'>This field is mandatory</span>
          </div>
          <div className='formGroup'>
            <label htmlFor='inputEmail'>Enter your email here: </label>
            <input id='inputEmail' type='email' placeholder='Enter your email here' />
            <span className='errorText'>This field is mandatory</span>
          </div>
        </div>
      </fieldset>
    </form>
    <hr />
  <h1 className='lisibility'>Table</h1>
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
          <td>Footer 1</td>
          <td>Footer 2</td>
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
