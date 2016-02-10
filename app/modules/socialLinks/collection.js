initSocialLinks = () => {
  const SocialLinks = new Mongo.Collection('socialLinks');
  const SocialLinksSchema = new SimpleSchema({
    iconName: { label: 'Nom de l\'icone', type: String, min: 2, max: 128},
    link: {
      label: 'Lien vers le réseau social', type: String
    }
  });
  SocialLinks.attachSchema(SocialLinksSchema);

  MainApp.Col.SocialLinks = SocialLinks;
  MainApp.Schema.SocialLinksSchema = SocialLinksSchema;

  if (Meteor.isServer) {
    if (SocialLinks.find({}, {fields: {_id: 1}}).count() === 0) {
      console.log('Empty SocialLinks, filling it with defaults');
      const { email, defaultSubject } = Meteor.settings.public.contact;
      if (!email) {
        console.warn('Contact email not defined in settings');
      }
      if (!defaultSubject) {
        console.warn('Contact default subject not defined in settings');
      }
      const mailUrl = `mailto:${Meteor.settings.public.contact.email}` +
        (!defaultSubject ? `subject:${Meteor.settings.public.contact.defaultSubject}` : '') +
        `?body=Bonjour`;
      [
        {iconName: 'twitter', link: '#'},
        {iconName: 'facebook', link: '#'},
        {iconName: 'linkedin', link: '#'},
        {iconName: 'envelope', link: mailUrl}
      ].forEach(p => SocialLinks.insert({...p}));
    }
    // Publish
    Meteor.publish('socialLinks.all', function() {
      return SocialLinks.find();
    });
    console.log('SocialLinks filled and exposed');
  }
};
