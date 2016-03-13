const { Views, Col } = MainApp;
const { AnimatedLink, CheckBox, Cart, Table, BaseReactMeteor } = Views;

class Subscribe extends BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('programs.all');
    }
    return { program: Col.Programs.findOne(), user: Meteor.user() };
  }
  getEvents() {
    let line = 0;
    const { user, program } = this.data;
    const userType = user.profile.category;
    return program.events.reduce((acc, e) => {
      e.sessions.forEach(s => {
        s.conferences.forEach(c => {
          const price = program.priceRights.find(p => p.code === c.code);
          const discount = program.discounts.find(d => d.code === c.code);
          const priceAmount = price.byType.find(t => t.category === userType).amount;
          const discountAmount = discount.byType.find(t => t.category === userType).amount;
          if (priceAmount !== -1) {
            acc.push([
              <article className='title' key={line++}>
                <h1 className='event'>{e.title}<span className='session'>{s.title}</span></h1>
                <p className='conference'>{c.title}</p>
                <p className='description'>{c.description}</p>
                {
                  c.moderator ? (<div className='moderator'>
                    <i className='fa fa-user-md'></i>
                    <span>{c.moderator}</span>
                  </div>) : ''
                }
                {
                  c.speaker ? (<p className='speakers'>
                    <i className='fa fa-users'></i>
                  <span>{c.speaker}</span>
                  </p>) : ''
                }
                <p className='hours'>
                  <i className='fa fa-clock-o'></i>
                  <span className='date'>{moment(c.begin).format('DD/MM/YY')}</span>
                  <span className='begin'>{moment(c.begin).format('HH:mm')}</span>
                  <span className='end'>{moment(c.end).format('HH:mm')}</span>
                </p>
              </article>,
              <div className='price'>{numeralAmountFormat(priceAmount)}</div>,
              <CheckBox>Je m'inscrits</CheckBox>
            ]);
          }
        });
      });
      return acc;
    }, []);
  }
  render() {
    const { user, program } = this.data;
    // console.log('program', program);
    // console.log('user', user);
    return (
      <section className='maximized MainContent Subscribe animated fadeIn'>
        <Cart amount={0} items={0} />
        <div className='lisibility'>
          <h1>Inscription</h1>
          <Table
            header={['Choix des prestations', 'Prix TTC', 'Je m\'inscrits']}
            items={this.getEvents()}
          />
        </div>
      </section>
    );
  }
}

MainApp.Views.Subscribe = Subscribe;
