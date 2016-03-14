const { Views, Col } = MainApp;
const { AnimatedLink, CheckBox, Cart, Table, Events, BaseReactMeteor } = Views;

class Subscribe extends BaseReactMeteor {
  constructor(props) {
    super(props);
    this.onSubscribe = this.onSubscribe.bind(this);
    this.state = {
      chosenForMe: [],
      chosenForAttendant: [],
      attendantName: '',
      attendantFirstName: ''
    };
  }
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('programs.all');
    }
    return {
      program: Col.Programs.findOne(
        {reference: 'univ2016'},
        {fields: {events: 1, priceRights: 1, discounts: 1, specialRules: 1, tva: 1}}
      ),
      user: Meteor.user()
    };
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
    const forMe = this.state.chosenForMe.reduce((acc, c) => {
      acc += Col.Programs.discountedVatPriceForCode(program, userType, c);
      return acc;
    }, 0);
    const forAttendant = this.state.chosenForAttendant.reduce((acc, c) => {
      acc += Col.Programs.discountedVatPriceForCode(program, 'Accompagnant', c);
      return acc;
    }, 0);
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
  render() {
    const { user, program } = this.data;
    const userType = user.profile.category;
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
          <div className='lisibility animated fadeInUp'>
            <Table
              header={tableHeader} items={this.getPrices('Accompagnant')}
            />
          </div> : ''
        }
      </section>
    );
  }
}

MainApp.Views.Subscribe = Subscribe;
