class Database {
  
  constructor () {
    this.storeDB = null;
    this.indexDB = null;

    /* => Example Usage:

    Database.setItem({
      id: 123456,
      name: "Jonah",
      age: 30
    });

    Database.getById(123456).then(byId => console.log({ byId }));
    Database.getByName('Jonah').then(byName => console.log({ byName }));
    */
  }

  /**
   * Initialize IndexedDB
   * 
   * @returns Promise
   */
  initialize () {

    return new Promise((resolve, reject) => {
      // This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
      var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

      // Open (or create) the database
      var open = indexedDB.open("MyDatabase", 1);

      // Create the schema
      open.onupgradeneeded = function() {
          var db = open.result;
          var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
          var index = store.createIndex("NameIndex", ["name"]);
      };

      open.onsuccess = function() {
          // Start a new transaction
          var db = open.result;
          var tx = db.transaction("MyObjectStore", "readwrite");
          var store = tx.objectStore("MyObjectStore");
          var index = store.index("NameIndex");

          resolve({ store, index });

          // Close the db when the transaction is done
          tx.oncomplete = function() {
              db.close();
          };
      }
    });
  }

  /**
   * get Store
   * 
   * @returns Promise
   */
  async store () {
    if(this.storeDB) {
      return this.storeDB;
    }

    const response = await this.initialize();
    this.storeDB = response.store;
    this.indexDB = response.index;
    return this.storeDB;
  }

  /**
   * get Index
   * 
   * @returns Promise
   */
  async index () {
    if(this.indexDB) {
      return this.indexDB;
    }

    const response = await this.initialize();
    this.storeDB = response.store;
    this.indexDB = response.index;

    return this.indexDB;
  }

  /**
   * Set new item in Database
   * 
   * @param {Object} data 
   * @returns 
   */
  async setItem (data) {
    const store = await this.store();
    console.log({ data, store });
    store.put(data);

    return data;
  }

  /**
   * Get item by ID
   * 
   * @param {Number} id 
   * @returns Database Item
   */
  getById (id) {
    return new Promise(async (resolve, reject) => {
      const response = (await this.store()).get(id)
      response.onsuccess = () => resolve(response.result);
    });
  }

  /**
   * Get item by Name
   * 
   * @param {String} name 
   * @returns Database Item
   */
  getByName (name) {
    return new Promise(async (resolve, reject) => {
      const response = (await this.index()).get([ name ])
      response.onsuccess = () => resolve(response.result);
    });
  }

}

export default new Database();