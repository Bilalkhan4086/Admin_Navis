class LocalStorageWrapper {
    static getItem(key) {
      return localStorage.getItem(key);
    }
    
    static setItem(key, value) {
      localStorage.setItem(key, value);
    }
  }
  export default LocalStorageWrapper;
  