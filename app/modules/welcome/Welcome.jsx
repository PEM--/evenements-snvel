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
    this.state = {
      initialAnimate: false
    };
    this.animate = this.animate.bind(this);
  }
  animate() {
    console.log('animate');
    if (!this.state.initialAnimate) {
      this.setState({initialAnimate: true});
      const spinner = $('.SpinnerContainer');
      const headlines = $('.headlines');
      const seq = [
        {
          e: headlines, p: {translateY: [0, '20px'], opacity: [1, 0]},
          o: {delay: 600, duration: 300, easing: 'ease-in-out', stagger: 100}
        },
        {
          e: spinner, p: 'transition.fadeOut',
          o: {duration: 300, easing: 'ease-in-out', sequenceQueue: false}
        }
      ];
      $.Velocity.RunSequence(seq);
    }
  }
  render() {
    console.log('Rendering Welcome');
    const { title, location, period } = this.data.program;
    return (
      <section className='Welcome maximized MainContent animated fadeInUp'>
        <Spinner className='maximized' />
        <article className='headlines lisibility'>
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
        </article>
        <article>
          <div className='titleCard'>
            <h2>Programme</h2>
          </div>
          <div className='kenBurnsCard'>
            <img src='/img/beach_tablet.jpg' />
          </div>
          <div className='coloredCard'/>
        </article>
        {/*<article>
          <div>
            <h2>subscribe</h2>
          </div>
          <div>
            <img src='/img/digital_genes_tablet.jpg' />
          </div>
        </article>
        <article>
          <h2>Partenaires</h2>
        </article>*/}
      </section>
    );
  }
}

Views.Welcome = Welcome;
