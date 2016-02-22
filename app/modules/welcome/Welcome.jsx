const { Views, Col } = MainApp;
const { Spinner, AnimatedLink } = Views;

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
    this.animate = this.animate.bind(this);
  }
  animate() {
    console.log('Ready');
    Meteor.defer(() => {
      $('.headlines').addClass('animated fadeInUp');
    });
  }
  render() {
    const { title, location, period } = this.data.program;
    return (
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
              mode={'single'} onReady={this.animate}
            >
              {location + ' - ' + period}
            </Textfit>
          </h2>
        </div>
      </section>
    );
  }
}

Views.Welcome = Welcome;
