const { Input } = MainApp.Views;

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: '', strength: 0 };
    this.onInnerChange = this.onInnerChange.bind(this);
  }
  onInnerChange(e) {
    const strength = zxcvbn(e).score;
    this.setState({ password: e, strength });
    if (strength > 2) {
      this.props.onChange(e);
    // Former state
    } else if (strength <= 2 && this.state.strength > 2) {
      this.props.onChange('');
    }
  }
  render() {
    return (
      <div className='password'>
        <Input
          type='password' label='Définissez votre mot de passe'
          placeholder='Votre mot de passe'
          value={this.state.password}
          onChange={this.onInnerChange}
        />
        <div className={classNames('strength', 'animated', {
          weak: this.state.strength === 0,
          notEnough: this.state.strength === 1,
          better: this.state.strength === 2,
          strong: this.state.strength > 2,
          flash: this.state.strength > 2,
        })} />
        <div className='hint'>
          Votre mot de passe devrait contenir plusieurs majuscules, minuscules, chiffres et symboles.
        </div>
      </div>
    );
  }
}

MainApp.Views.Password = Password;
