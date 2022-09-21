class LocalStorageWrapper {
    static getItem(key) {
      return JSON.parse(localStorage.getItem(key));
    }
    static setItem(key, json) {
      localStorage.setItem(key, JSON.stringify(json));
    }
  }
  export default LocalStorageWrapper;
  