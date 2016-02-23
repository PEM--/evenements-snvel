const { Views } = MainApp;
const { Button, AnimatedLink } = Views;

class Cookie extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='Cookie'>
        <div className='CookieDisclaimer'>
          <i className='fa fa-bullhorn flexItemStaticSize' />
          <div className='content flexItemDynamicSize'>
            <p className='lisibility'>
              {Meteor.settings.public.cookie.text}
            </p>
            <Button className='btn'>J'accepte</Button>
            <AnimatedLink to='/cookie' isCream={true}>En savoir plus</AnimatedLink>
          </div>
        </div>
      </div>
    );
  }
}

Views.Cookie = Cookie;
