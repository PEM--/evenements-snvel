const { Button, CheckBox, Radio, Table } = MainApp.Views;

class Tests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked1: false,
      isChecked2: true,
      isChecked3: false,
      isChecked4: true,
      radioSelected: 'choice1'
    };
    this.onChange1 = this.onChange1.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.onChange3 = this.onChange3.bind(this);
    this.onChange4 = this.onChange4.bind(this);
  }
  onChange1() { this.setState({isChecked1: !this.state.isChecked1}); }
  onChange2() { this.setState({isChecked2: !this.state.isChecked2}); }
  onChange3() { this.setState({isChecked3: !this.state.isChecked3}); }
  onChange4() { this.setState({isChecked4: !this.state.isChecked4}); }
  onSelectedRadio(e) {
    console.log(e);
  }
  render() {
    console.log('Test component');
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
            <CheckBox
              isChecked={this.state.isChecked1}
              onChange={this.onChange1}
            >
              Opt-in checkbox
            </CheckBox>
            <CheckBox
              isChecked={this.state.isChecked2}
              onChange={this.onChange2}
            >
              Opt-out checkbox (check by default)
            </CheckBox>
            <Radio
              value={this.state.radioSelected}
              onChange={this.onSelectedRadio}
              label='Choose one formula' options={[
                {label: 'Choice 1', value: 'choice1'},
                {label: 'Choice 2', value: 'choice2'},
                {label: 'Choice 3', value: 'choice3'}
              ]}
            />
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
        <Table
          header={['Header 1', 'Header 2']}
          items={[
            ['Content 1 - 1', 'Content 1 - 2'],
            ['Content 2 - 1', 'Content 2 - 2']
          ]}
          footer={['Footer 1', 'Footer 2']}
        />
        <Table
          items={[
            ['Content 1 - 1', 'Content 1 - 2'],
            ['Content 2 - 1', 'Content 2 - 2']
          ]}
          footer={['Footer 1', 'Footer 2']}
        />
        <Table
          header={['Header 1', 'Header 2']}
          items={[
            ['Content 1 - 1', 'Content 1 - 2'],
            ['Content 2 - 1', 'Content 2 - 2']
          ]}
        />
        <Table
          items={[
            [<b>Test comp 1</b>, <b>Test comp 2</b>],
            [
              <CheckBox isChecked={this.state.isChecked3} onChange={this.onChange3} />,
              <CheckBox isChecked={this.state.isChecked4} onChange={this.onChange4} />
            ],
            // [
            //   <Radio options={[
            //     {label: 'Choice 1', value: 'choice1'},
            //     {label: 'Choice 2', value: 'choice2'},
            //     {label: 'Choice 3', value: 'choice3'}
            //   ]}/>,
            //   <Radio options={[
            //     {label: 'Choice 1', value: 'choice1'},
            //     {label: 'Choice 2', value: 'choice2'},
            //     {label: 'Choice 3', value: 'choice3'}
            //   ]}/>
            // ]
          ]}
        />
      </div>
    );
  }
}

FlowRouter.route('/ctests', {
  name: 'ctests',
  action() {
    console.log('Tests route');
    DocHead.setTitle('Test component');
    ReactLayout.render(MainApp.Views.MainLayout, {
      children: <Tests />
    });
  }
});
