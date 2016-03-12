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
    return this.data.program.events.reduce((acc, e) => {
      e.sessions.forEach(s => {
        s.conferences.forEach(c => {
          acc.push([
            <div className='title' key={line++}>
              <div className='event'>{e.title}</div>
              <div className='session'>{s.title}</div>
              <div className='conference'>{c.title}</div>
              <div className='description'>{c.description}</div>
              {
                c.moderator ? (<div className='moderator'>
                  <i className='fa fa-user'></i>
                  <span>{c.moderator}</span>
                </div>) : ''
              }
              <div className='hours'>
                <i className='fa fa-clock-o'></i>
                <div className='date'>{moment(c.begin).format('DD/MM/YY')}</div>
                <div className='begin'>{moment(c.begin).format('HH:mm')}</div>
                <div className='end'>{moment(c.end).format('HH:mm')}</div>
              </div>
            </div>,
            <div className='price'>{numeralAmountFormat(0)}</div>,
            <CheckBox>Je m'inscrits</CheckBox>
          ]);
        });
      });
      return acc;
    }, []);
  }
  render() {
    const { user, program } = this.data;
    console.log('program', program);
    console.log('user', user);
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
