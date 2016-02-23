const { Views, Utils } = MainApp;
const { Button, AnimatedLink } = Views;

class Cookie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false
    };
    this.onCookieAccept = this.onCookieAccept.bind(this);
  }
  onCookieAccept() {
    const cookie = Utils.Cookie.get();
    cookie.accept();
    this.setState({display: false});
  }
  render() {
    return (
      <div className={classNames('Cookie', {isDisplayed: this.state.display})}>
        <div className='CookieDisclaimer'>
          <i className='fa fa-bullhorn flexItemStaticSize' />
          <div className='content flexItemDynamicSize'>
            <p className='lisibility'>
              {Meteor.settings.public.cookie.text}
            </p>
            <Button className='btn' onClick={this.onCookieAccept}>J'accepte</Button>
            <AnimatedLink to='/cookie' isCream={true}>En savoir plus</AnimatedLink>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    if (Meteor.isClient) {
      const cookie = Utils.Cookie.get();
      if (!cookie.isAccepted()) {
        Meteor.setTimeout(() => {
          this.setState({display: true});
        }, 600);
      }
    }
  }
}

Views.Cookie = Cookie;
