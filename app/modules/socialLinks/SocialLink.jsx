const { Views, Col, Utils } = MainApp;

const DumbSocialLink = ({iconName, link}) => (
  <a href={link} className='lisibility' target='_blank'>
    <i className={`fa fa-${iconName}`}></i>
  </a>
);

const DumbSocialLinks = ({socialLinks}) => (
  <div className='SocialLinks'>
    {socialLinks.map(sl => <DumbSocialLink key={sl._id} {...sl}/>)}
  </div>
);

class SocialLinks extends Views.BaseReactMeteor {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    if (Meteor.isServer) {
      const handle = Meteor.subscribe('socialLinks.all');
    }
    const socialLinks = Col.SocialLinks.find(
      {}, {fields: {iconName: 1, link: 1}}).fetch();
    return { socialLinks };
  }
  render() {
    return <DumbSocialLinks socialLinks={this.data.socialLinks} />;
  }
}

Views.SocialLinks = SocialLinks;
