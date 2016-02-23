// Base class for cookies
class BaseCookie {
  constructor(dict, path = '/') {
    this.dict = dict;
    this.path = path;
    this.expires = dict.expires;
    this.currentValue = null;
    this.getAll = () => {
      if (this.currentValue === null) {
        const currentCookie = Cookie.get(this.dict.name);
        if (currentCookie) {
          this.currentValue = JSON.parse(currentCookie);
        }
      }
      return this.currentValue;
    };
    this.isAccepted = () => {
      if (this.getAll()) {
        return true;
      }
      return false;
    };
    this.write = () => {
      const options = {
        path: this.path,
        expires: this.expires
      };
      log.info('Saving cookie: ', this.dict.name, ': Value:', this.currentValue, 'Options:', options);
      document.cookie = Cookie.set(this.dict.name, JSON.stringify(this.currentValue), options);
    };
    this.accept = () => {
      this.currentValue = { subscribed: false };
      this.write();
    };
    this.isSubscribed = () => this.getAll().currentValue.subscribed;
    this.subscribe = () => {
      this.currentValue = this.getAll();
      this.currentValue.subscribed = true;
      this.write();
    };
  }
}

BaseCookie.instance = null;
BaseCookie.get = () => BaseCookie.instance === null ? new BaseCookie(Meteor.settings.public.cookie) : BaseCookie.instance;

MainApp.Utils.Cookie = BaseCookie;
