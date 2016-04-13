import React from 'react';

const { Views, Col } = MainApp;
const { Header, Footer, MainMenu, Cookie, Alert } = Views;

const MainBody = ({children, onMenuToggle, isMenuOpen, basicPages}) => {
  return (
    <div style={{minHeight: '100vh'}}>
      <div id='outdated' />
      <Cookie />
      <Alert stack={{limit: 3}} />
      <MainMenu isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle} />
      <div
        className='flex col'
        style={{minHeight: '100%'}}
      >
        <Header isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle} />
        <main className='flexItemDynamicSize'>
          {children}
        </main>
        <Footer
          className='flexItemStaticSize primary2Color'
          basicPages={basicPages}
        />
      </div>
    </div>
  );
};

if (Meteor.isClient) {
  Meteor.startup(() => {
    Session.setDefault('isMenuOpen', false);
    let innerMenuOpen = false;
    const menuToggle = (isMenuOpen) => {
      if (innerMenuOpen === isMenuOpen) {
        return;
      }
      innerMenuOpen = isMenuOpen;
      const $Menu = $('.MainMenu');
      const $button = $Menu.find('button');
      const $MenuItems = $Menu.find('.MenuItem');
      const seqIn = [
        {e: $Menu, p: 'transition.slideRightIn', o: {
          duration: 150, easing: 'ease-in-out'
        }},
        {e: $MenuItems, p: 'transition.slideRightIn', o: {
          duration: 100, stagger: 50, easing: 'ease-in-out'
        }},
        {e: $button, p: 'transition.slideDownIn', o: {
          duration: 60, easing: 'ease-in-out'
        }}
      ];
      const seqOut = [
        {e: $button, p: 'transition.slideUpOut', o: {
          display: 'block', duration: 60, easing: 'ease-in-out'
        }},
        {e: $MenuItems, p: 'transition.slideRightOut', o: {
          duration: 100, stagger: 50, easing: 'ease-in-out'
        }},
        {e: $Menu, p: 'transition.slideRightOut', o: {
          duration: 100, easing: 'ease-in-out'
        }}
      ];
      $.Velocity.RunSequence(isMenuOpen ? seqIn : seqOut);
    };
    Tracker.autorun((comp) => {
      const isMenuOpen = Session.get('isMenuOpen');
      if (!comp.firstRun) {
        menuToggle(isMenuOpen);
      }
    });
  });
}

class MainLayout extends Views.BaseReactMeteor {
  constructor(props) {
    super(props);
    this.onMenuToggle = this.onMenuToggle.bind(this);
    this.state = {
      basicPages: [],
      isMenuOpen: false
    };
    this.subscribe('basicPages.all');
    this.autorun(() => {
      this.setState({isMenuOpen: Meteor.isClient ? Session.get('isMenuOpen') : false});
    });
    this.autorun(() => {
      this.setState({basicPages: Col.BasicPages.find({}, {fields: {title: 1, slug: 1}}).fetch()});
    });
  }
  onMenuToggle() {
    Session.set('isMenuOpen', !Session.get('isMenuOpen'));
  }
  render() {
    console.log('Render MainLayout');
    // Title
    const TITLE = 'Evènements SNVEL';
    DocHead.setTitle(TITLE);
    [
      {n: 'viewport', c: 'width=device-width, initial-scale=1'},
      // Colors for Windows phone and desktop
      {n: 'msapplication-TileColor', c: palette.primary2Color},
      {n: 'msapplication-TileImage', c: '/mstile-144x144.png'},
      {n: 'theme-color', content: '#ffffff'},
      // Title for mobile bookmarks and shortcuts
      {n: 'apple-mobile-web-app-title', c: TITLE},
    ].forEach(m => DocHead.addMeta({name: m.n, content: m.c}));
    // Others meta tags
    // [
    //   'description',
    //   'author',
    //   'copyright',
    //   'distribution',
    //   'language',
    //   'rating',
    //   'reply-to',
    //   'web-author'
    // ].map(function (meta) {
    //   const obj = {name: meta, content: dict.meta[meta]};
    //   log.debug('Meta', obj);
    //   DocHead.addMeta(obj);
    // });
    // // Social tags
    // // Twitter card
    // [
    //   {name: 'twitter:card', content: 'summary_large_image'},
    //   {name: 'twitter:site', content: '@AVEF_'},
    //   {name: 'twitter:creator', content: '@AVEF_'},
    //   {name: 'twitter:title', content: 'Je me suis inscrit au congrès - Inscrivez-vous !'},
    //   {name: 'twitter:description', content: dict.description},
    //   // 499x350
    //   {name: 'twitter:image', content: `${Meteor.settings.public.proxy.url}img/twitter_card.jpg`}
    // ].map(function(meta) {
    //   const obj = {name: meta.name, content: meta.content};
    //   DocHead.addMeta(obj);
    // });
    // // Open graph
    // [
    //   {name: 'og:title', content: dict.shortTitle},
    //   {name: 'og:type', content: 'website'},
    //   {name: 'og:site_name', content: Meteor.settings.public.proxy.url},
    //   {name: 'og:locale', content: 'fr_FR'},
    //   // 484x252
    //   {name: 'og:image', content: `${Meteor.settings.public.proxy.url}img/open_graph.jpg`}
    // ].map(function(meta) {
    //   const obj = {name: meta.name, content: meta.content};
    //   DocHead.addMeta(obj);
    // });
    // // Rich snippets v2
    // let snippets = [
    //   // Main rich snippet
    //   {
    //     '@context': 'http://schema.org',
    //     '@type': 'Organization',
    //     url: `${Meteor.settings.public.proxy.url}`,
    //     logo: `${Meteor.settings.public.proxy.url}img/logo.svg`,
    //     // Does not work like this, need either a real URL contact form
    //     // or a phone number.
    //     // contactPoint: {
    //     //   '@type': 'ContactPoint',
    //     //   url: 'mailto:avef.paris@wanadoo.fr',
    //     //   contactType: 'customer service'
    //     // },
    //     // Events
    //     // Search
    //   },
    //   // Event
    //   {
    //     '@context': 'http://schema.org',
    //     '@type': 'Event',
    //     name: dict.title,
    //     startDate: moment(dict.startDate).format(),
    //     endDate: moment(dict.endDate).format(),
    //     url: Meteor.settings.public.proxy.url,
    //     image: `${Meteor.settings.public.proxy.url}/favicon-96x96.png`,
    //     // Location
    //     location: {
    //       '@type': 'Place',
    //       sameAs: dict.location.site,
    //       name: dict.location.name,
    //       address: {
    //         '@type': 'PostalAddress',
    //         streetAddress: dict.location.address.streetAddress,
    //         addressLocality: dict.location.address.addressLocality,
    //         postalCode: dict.location.address.postalCode
    //       }
    //     },
    //     // Offers
    //     offers: {
    //       '@type': 'AggregateOffer',
    //       // @TODO Get this from the program and the pricing table
    //       lowPrice: 70,
    //       highPrice: 1200,
    //       priceCurrency: 'EUR',
    //       url: `${Meteor.settings.public.proxy.url}/subscription`
    //     }
    //   },
    //   // SNVEL
    //   {
    //     '@context': 'http://schema.org',
    //     '@type': 'Organization',
    //     url: 'http://www.snvel.fr',
    //     logo: `${Meteor.settings.public.proxy.url}img/snvel.svg`
    //   },
    // ];
    //   // Add social links for main snippet
    //   snippets[0].sameAs = _.pluck(socialLinks, 'url');
    //   snippets.map(function(snippet) {
    //     DocHead.addLdJsonScript(snippet);
    //   });
    // }
    return (
      <MainBody
        onMenuToggle={this.onMenuToggle}
        isMenuOpen={this.data.isMenuOpen}
        basicPages={this.data.basicPages}
      >
        {this.props.children}
      </MainBody>
    );
  }
}

Views.MainLayout = MainLayout;
