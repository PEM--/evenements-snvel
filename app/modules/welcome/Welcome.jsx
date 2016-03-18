const { Views, Col } = MainApp;
const { Spinner } = Views;

const Card = ({to, title, img, color}) => (
  <article className='card'>
    <a href={to} >
      <div className='title'>
        <h2>{title}</h2>
      </div>
      <div className='kenBurns'>
        <div className='imageWrapper'>
          <img src={`/img/${img}_tablet.jpg`} width='438px' height='219px' />
        </div>
      </div>
      <div className='colored' style={{backgroundColor: color}} />
    </a>
  </article>
);

class Welcome extends Views.BaseReactMeteor {
  getMeteorData() {
    if (Meteor.isServer) {
      Meteor.subscribe('programs.all');
    }
    return {
      program: Col.Programs.findOne(
        {reference: this.props.program},
        {fields: {title: 1, location: 1, period: 1}}
      ),
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
      const cards = $('.card');
      const seq = [
        {
          e: headlines, p: {translateY: [0, '20px'], opacity: [1, 0]},
          o: {delay: 600, duration: 300, easing: 'ease-in-out', stagger: 300}
        },
        {
          e: spinner, p: 'transition.fadeOut',
          o: {duration: 300, easing: 'ease-in-out', sequenceQueue: false}
        },
        {
          e: cards, p: 'transition.slideUpIn',
          o: {duration: 600, easing: 'ease-in-out', stagger: 300}
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
        <Card to='/program' title='Programme' img='beach' color={palette.primary3Color} />
        <Card to='/subscribe' title='Inscription' img='digital_genes' color={palette.accent3Color} />
        {/*<article>
          <h2>Partenaires</h2>
        </article>*/}
      </section>
    );
  }
}

Views.Welcome = Welcome;
