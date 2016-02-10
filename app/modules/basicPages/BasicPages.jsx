const { Views, Col, Utils } = MainApp;

// Link modifier
const prettyLink = (text) => {
  return text
    .replace(/href/g, 'class="AnimatedLink basic" href')
    .replace(/SNVEL/g,
      '<a class="AnimatedLink basic" href="http://www.snvel.fr" target="_blank">SNVEL</a>');
};

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
      {slug: this.props.slug}, {fields: {title: 1, content: 1}}
    );
  }
  render() {
    return (
      <DumbBasicPages title={this.data.title} content={this.data.content} />
    );
  }
}

MainApp.Views.BasicPages = BasicPages;