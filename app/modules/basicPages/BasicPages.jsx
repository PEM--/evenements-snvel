const { Views, Col, Utils } = MainApp;
const { prettyLink } = Utils;

const DumbBasicPages = ({title, content}) => {
  const htmlContent = Utils.prettyLink(marked(content));
  return (
    <div className='BasicPages maximized animated fadeIn lisibility'>
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
