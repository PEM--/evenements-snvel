const { Input } = MainApp.Views;

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: '', strength: 0 };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      password: e.target.value,
      strength: zxcvbn(e.target.value).score
    });
    console.log('onChange', e.target.value, zxcvbn(e.target.value).score);
  }
  render() {
    return (
      <div className='password'>
        <Input
          type='password' label='Définissez votre mot de passe'
          placeholder='Votre mot de passe'
          value={this.state.password}
          onChange={this.onChange}
        />
      <div className={classNames('strength', {
        weak: this.state.strength === 0,
        notEnough: this.state.strength === 1,
        better: this.state.strength === 2,
        strong: this.state.strength > 2
      })} />
      <div className='hint'>
          Votre mot de passe devrait contenir plusieurs majuscules, minuscules, chiffres et symboles.
        </div>
      </div>
    );
  }
}

MainApp.Views.Password = Password;
