const { Views, Col } = MainApp;
const { Spinner, AnimatedLink } = Views;

const animate = () => {
  console.log('Ready');
  Meteor.defer(() => {
    $('.headlines').addClass('animated fadeInUp');
  });
};

const DumBWelcome = ({ title, location, period }) => (
  <section className='maximized MainContent animated fadeInUp'>
    <div className='headlines lisibility'>
      <h1 className='headline'>
        <Textfit
          style={{width: '100%', maxWidth: '600px', lineHeight: '100%', display: 'inline-block'}}
          mode={'single'}
        >
          {title}
        </Textfit>
      </h1>
      <h2 className='headline lisibility'>
        <Textfit
          style={{width: '100%', maxWidth: '600px', lineHeight: '100%', display: 'inline-block'}}
          mode={'single'} onReady={animate}
        >
          {location + ' - ' + period}
        </Textfit>
      </h2>
    </div>
  </section>
);

class Welcome extends Views.BaseReactMeteor {
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('programs.all');
    }
    return {
      program: Col.Programs.findOne({reference: 'univ2016'}, {
        fields: {title: 1, location: 1, period: 1, description: 1}}),
    };
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { title, location, period } = this.data.program;
    return <DumBWelcome title={title} location={location} period={period} />;
  }
}

Views.Welcome = Welcome;
