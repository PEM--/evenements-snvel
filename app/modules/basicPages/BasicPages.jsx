const { Views, Col, Utils } = MainApp;

const DumbBasicPages = ({title, content}) => {
  const htmlContent = Utils.prettyLink(marked(content));
  return (
    <section className='MainContent maximized animated fadeIn lisibility'>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: htmlContent }} />
      <Views.AnimatedLink to='/'>Revenez à l'Accueil</Views.AnimatedLink>
    </section>
  );
};

class BasicPages extends Views.BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    console.log('BasicPages: Getting data');
    if (Meteor.isServer) {
      Meteor.subscribe('basicPages.all');
    }
    return Col.BasicPages.findOne({slug: this.props.slug});
  }
  render() {
    console.log('BasicPages: Rendering page');
    return (
      <DumbBasicPages
        key={this.data.slug} title={this.data.title} content={this.data.content}
      />
    );
  }
}

Views.BasicPages = BasicPages;
