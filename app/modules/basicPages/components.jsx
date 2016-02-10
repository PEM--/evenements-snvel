const { Views, Col } = MainApp;
const { AnimatedLink } = Views;

const DumbBasicPages = ({title, content}) => {
  const htmlContent = marked(content);
  return (
    <div className='maximized animated fadeIn'>
      <AnimatedLink to='/'>Retour</AnimatedLink>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: htmlContent }} />
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
