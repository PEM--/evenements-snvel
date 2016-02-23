// Base class for cookies
class BaseCookie {
  constructor(dict, path = '/') {
    this.dict = dict;
    this.path = path;
    this.expires = dict.expires;
    this.currentValue = null;
  }
  getAll() {
    if (this.currentValue === null) {
      const currentCookie = Cookie.get(this.dict.name);
      if (currentCookie) {
        this.currentValue = JSON.parse(currentCookie);
      }
    }
    return this.currentValue;
  }
  isAccepted() {
    if (this.getAll()) {
      return true;
    }
    return false;
  }
  write() {
    const options = {
      path: this.path,
      expires: this.expires
    };
    document.cookie = Cookie.set(this.dict.name, JSON.stringify(this.currentValue), options);
  }
  accept() {
    this.currentValue = { subscribed: false };
    this.write();
  }
}

BaseCookie.instance = null;
BaseCookie.get = () => BaseCookie.instance === null ? new BaseCookie(Meteor.settings.public.cookie) : BaseCookie.instance;

MainApp.Utils.Cookie = BaseCookie;
