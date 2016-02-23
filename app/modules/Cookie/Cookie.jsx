const { Views } = MainApp;

class Cookie extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div className='Cookie'>
      <div className='CookieDisclaimer maximized'>
        <p>
          <i className='fa fa-bullhorn' />
          <span className='content'>
            {Meteor.settings.public.cookie.text}
          </span>
        </p>
      </div>
    </div>);
  }
}

Views.Cookie = Cookie;
