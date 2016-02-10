const { Views, Col } = MainApp;

const DumbBasicPages = ({title, content}) => {
  const htmlContent = marked(content);
  return (
    <div className='animated fadeInUp'>
      <a href='/'>Retour</a>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: htmlContent }} />
      {/*<AnimatedLink to='/'>Retour</AnimatedLink>*/}
    </div>
  );
};

class BasicPages extends Views.BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    if (Meteor.isServer) {
      const handle = Meteor.subscribe('basicPages.all');
    }
    return Col.BasicPages.findOne(
      {slug: 'cgv'}, {fields: {title: 1, content: 1}}
    );
  }
  render() {
    return (
      <DumbBasicPages title={this.data.title} content={this.data.content} />
    );
  }
}

MainApp.Views.BasicPages = BasicPages;
