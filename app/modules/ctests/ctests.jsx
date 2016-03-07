const { Button, CheckBox, Radio, Input, Password, Table, Select } = MainApp.Views;

class Tests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked1: false, isChecked2: true, isChecked3: false, isChecked4: true,
      radioSelected: 'choice1',
      table1: 'choice2', table2: 'choice3',
      text: '', errorText: null,
      email: 'pemarchandet@gmail.com', errorEmail: null,
      password: '', errorPassword: null,
      select: 'one', showSubComponent: 0,
      isDisabled: false
    };
    [
      'onChange1', 'onChange2', 'onChange3', 'onChange4', 'onSelectedRadio',
      'selectTable1', 'selectTable2', 'onTextChange', 'onEmailChange',
      'onPasswordChange', 'onErrorText', 'onErrorEmail', 'onErrorPassword',
      'onSelectChange', 'onBetterPassword', 'onDisabled'
    ].map(f => this[f] = this[f].bind(this));
  }
  onChange1() { this.setState({isChecked1: !this.state.isChecked1}); }
  onChange2() { this.setState({isChecked2: !this.state.isChecked2}); }
  onChange3() { this.setState({isChecked3: !this.state.isChecked3}); }
  onChange4() { this.setState({isChecked4: !this.state.isChecked4}); }
  onSelectedRadio(e) {
    console.log('Radio', e);
    this.setState({radioSelected: e});
  }
  selectTable1(e) { this.setState({table1: e.target.value}); }
  selectTable2(e) { this.setState({table2: e.target.value}); }
  onTextChange(e) {
    console.log('Text', e);
    this.setState({text: e});
  }
  onEmailChange(e) {
    console.log('Email', e);
    this.setState({email: e});
  }
  onPasswordChange(e) {
    console.log('Password', e);
    this.setState({password: e});
  }
  onErrorText() {
    this.setState({
      errorText: this.state.errorText ? null : 'Erreur dans le texte'
    });
  }
  onErrorEmail() {
    this.setState({
      errorEmail: this.state.errorEmail ? null : 'Email incorrect'
    });
  }
  onErrorPassword() {
    this.setState({
      errorPassword: this.state.errorPassword ? null : 'Mot de passe incorrect'
    });
  }
  onSelectChange(e) {
    console.log('onSelectChange', e);
    this.setState({select: e});
  }
  onBetterPassword(e) {
    console.log(`onBetterPassword: '${e}'`);
  }
  onDisabled() {
    console.log('Disabling ?', this.state.isDisabled);
    this.setState({isDisabled: !this.state.isDisabled});
  }
  render() {
    return (
      <div className='MainContent maximized'>
        <CheckBox isChecked={this.state.isDisabled} onChange={this.onDisabled}>Disabled: </CheckBox>
        <Input
          type='text' placeholder='Disabled on demand'
          disabled={this.state.isDisabled}
          onChange={() => {}}
        />
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
        <h2 className='lisibility'>Basic form</h2>
        <form>
          <fieldset>
            <label>Error setter</label>
              <CheckBox isChecked={this.state.errorText} onChange={this.onErrorText}>Error in Text: </CheckBox>
              <CheckBox isChecked={this.state.errorEmail} onChange={this.onErrorEmail}>Error in Email: </CheckBox>
              <CheckBox isChecked={this.state.errorPassword} onChange={this.onErrorPassword}>Error in Password: </CheckBox>
          </fieldset>
          <fieldset>
            <Select
              value='one'
              onChange={this.onSelectChange}
              placeholder='Sélectionner une option'
              options={[
                { value: 'one', label: 'One' },
                { value: 'two', label: 'Two' }
              ]}
            />
            <div className='fieldsContainer'>
              <Password placeholder='Password creation' onChange={this.onBetterPassword} />
              <Input
                type='text' label='Enter your text here: '
                placeholder='Enter your text here'
                errorText={this.state.errorText}
                value={this.state.text}
                onChange={this.onTextChange}
              />
              <Input
                type='email' label='Enter your email here: '
                placeholder='Enter your email here'
                errorText={this.state.errorEmail}
                value={this.state.email}
                onChange={this.onEmailChange}
              />
              <Input
                type='password' label='Enter your password here: '
                placeholder='Enter your password here'
                errorText={this.state.errorPassword}
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
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
            [
              <Radio
                value={this.state.table1} onChange={this.selectTable1}
                options={[
                  {label: 'Choice 1', value: 'choice1'},
                  {label: 'Choice 2', value: 'choice2'},
                  {label: 'Choice 3', value: 'choice3'}
                ]}
              />,
              <Radio
                value={this.state.table2} onChange={this.selectTable2}
                options={[
                  {label: 'Choice 1', value: 'choice1'},
                  {label: 'Choice 2', value: 'choice2'},
                  {label: 'Choice 3', value: 'choice3'}
                ]}
              />
            ]
          ]}
        />
        <MeteorGriddle
          publication='basicPages.withCounter'
          collection={MainApp.Col.BasicPages}
          columns={['title', 'slug']}
          matchingResultsCount='basicPages.counter'
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
