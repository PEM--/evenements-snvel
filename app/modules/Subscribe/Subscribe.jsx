const { Views, Col } = MainApp;
const { CheckBox, Cart, Table, Input, Button, Events, BaseReactMeteor } = Views;

class Subscribe extends BaseReactMeteor {
  constructor(props) {
    super(props);
    [
      'onSubscribe', 'onValidateForm', 'onChangeAttendantName', 'onChangeAttendantFirstName'
    ].forEach(f => { this[f] = this[f].bind(this); });
    const user = Meteor.user();
    const { program } = this.props;
    this.state = {
      chosenForMe: [],
      chosenForAttendant: [],
      attendantName: '',
      attendantFirstName: ''
    };
    if (user && user.profile && user.profile.programs) {
      const found = user.profile.programs.find(p => p.reference === this.props.program);
      if (found) {
        this.state.chosenForMe = found.prices;
        if (found.attendant) {
          this.state.chosenForAttendant = found.attendant.prices;
          this.state.attendantName = found.attendant.name;
          this.state.attendantFirstName = found.attendant.firstName;
        }
      }
    }
  }
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('programs.all');
    }
    const program = Col.Programs.findOne(
      {reference: this.props.program},
      {fields: {events: 1, priceRights: 1, discounts: 1, specialRules: 1, tva: 1}}
    );
    const user = Meteor.user();
    return { program, user };
  }
  getChosenState(userType) {
    return userType === 'Accompagnant' ? this.state.chosenForAttendant : this.state.chosenForMe;
  }
  setChosenState(userType, newCodes) {
    if (userType === 'Accompagnant') {
      this.setState({chosenForAttendant: newCodes});
    } else {
      this.setState({chosenForMe: newCodes});
    }
  }
  isSelected(userType, code) {
    return this.getChosenState(userType).indexOf(code) !== -1;
  }
  sumPrices(program, userType) {
    const now = moment();
    const forMe = Col.Programs.finalPrice(
      program, userType, this.state.chosenForMe, now
    );
    const forAttendant = Col.Programs.finalPrice(
      program, 'Accompagnant', this.state.chosenForAttendant, now
    );
    return forMe + forAttendant;
  }
  onSubscribe(userType) {
    return (e) => {
      e.preventDefault();
      const code = e.target.name;
      const chosenState = this.getChosenState(userType);
      const idx = chosenState.indexOf(code);
      const chosen = idx === -1 ?
        [... chosenState, code] :
        [... chosenState.slice(0, idx), ... chosenState.slice(idx + 1)];
      const { user, program } = this.data;
      this.setChosenState(userType, chosen);
    };
  }
  onCancel() { FlowRouter.go('/'); }
  getPrices(userType) {
    let line = 0;
    const { user, program } = this.data;
    return program.priceRights.reduce((acc, p) => {
      const priceAmount = Col.Programs.priceForCode(program, userType, p.code);
      const eventTags = p.inEvents && priceAmount !== -1 ?
        Events({events: program.events, code: p.code}) : '';
      if (priceAmount !== -1) {
        acc.push([
          <article className='title' key={line++}>
            <h2 className='priceDescription'>{p.description}</h2>
            {/* eventTags */}
          </article>,
          <div className='prices'>
            <div className='price'>{numeralAmountFormat(priceAmount)} HT</div>
            <div className='price'>
              {numeralAmountFormat(Col.Programs.vatPriceForCode(program, userType, p.code))} TTC
            </div>
          </div>,
          <CheckBox
            name={p.code} isChecked={this.isSelected(userType, p.code)} onChange={this.onSubscribe(userType)}
          >
            {userType !== 'Accompagnant' ? 'Je m\'inscrits' : 'Je l\'inscrits' }
          </CheckBox>
        ]);
      }
      return acc;
    }, []);
  }
  // Remember scrolling before updating
  componentWillUpdate() {
    this.formerScroll = window.scrollY;
  }
  // Force scrolling while updating
  componentDidUpdate() {
    window.scrollTo(0, this.formerScroll);
  }
  isValidForm(program) {
    const propose = Col.Programs.proposeAttendant(program, this.state.chosenForMe);
    const { chosenForMe, chosenForAttendant, attendantName, attendantFirstName } = this.state;
    return (chosenForMe.length > 0 &&
      !propose || (
        propose && chosenForAttendant.length > 0 &&
        attendantName.length > 0 && attendantFirstName.length > 0
      )
    );
  }
  onChangeAttendantName(e) {
    const value = s(e).trim().toLowerCase().titleize().value();
    this.setState({attendantName: value});
  }
  onChangeAttendantFirstName(e) {
    const value = s(e).trim().toLowerCase().titleize().value();
    this.setState({attendantFirstName: value});
  }
  onValidateForm(e) {
    e.preventDefault();
    let addedProgram = {
      reference: this.props.program,
      status: 'Inscrit',
      prices: this.state.chosenForMe
    };
    if (this.state.chosenForAttendant.length > 0) {
      addedProgram.attendant = {
        name: this.state.attendantName,
        firstName: this.state.attendantFirstName,
        prices: this.state.chosenForAttendant
      };
    }
    Meteor.call('user.addProgram', addedProgram, (error) => {
      if (error) {
        console.warn('Error while adding programs', error);
        return sAlert.error('Enregistrement impossible');
      }
      FlowRouter.go('payment');
    });
  }
  render() {
    const { user, program } = this.data;
    const userType = user && user.profile && user.profile.category ? user.profile.category : 'Adhérent SNVEL';
    const propose = Col.Programs.proposeAttendant(program, this.state.chosenForMe);
    const tableHeader = ['Choix des prestations', 'Prix', 'Sélection'];
    return (
      <section className='maximized MainContent Subscribe animated fadeIn'>
        <Cart
          amount={this.sumPrices(program, userType)}
          items={this.state.chosenForMe.length + this.state.chosenForAttendant.length}
        />
        <div className='lisibility'>
          <h1>Inscription</h1>
          <Table
            header={tableHeader} items={this.getPrices(userType)}
          />
        </div>
        { propose ?
          <div className='lisibility animated fadeIn'>
            <form className='attendant'>
              <h2>Votre accompagnant</h2>
              <fieldset>
                <Input
                  type='text' placeholder='Nom'
                  value={this.state.attendantName}
                  onChange={this.onChangeAttendantName}
                />
                <Input
                  type='text' placeholder='Prénom'
                  value={this.state.attendantFirstName}
                  onChange={this.onChangeAttendantFirstName}
                />
              </fieldset>
            </form>
            <Table
              header={tableHeader} items={this.getPrices('Accompagnant')}
            />
          </div> : ''
        }
        <form>
          <Button
            primary={true} disabled={!this.isValidForm(program)}
            onClick={this.onValidateForm}
          >
            Je valide mon inscription
          </Button>
          <Button iconName='times' onClick={this.onCancel}>J'annule</Button>
        </form>
      </section>
    );
  }
}

MainApp.Views.Subscribe = Subscribe;
