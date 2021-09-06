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
    return response.store;
    // this.storeDB = response.store;
    // this.indexDB = response.index;
    // return this.storeDB;
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
    return response.index;
    // this.storeDB = response.store;
    // this.indexDB = response.index;

    // return this.indexDB;
  }

  /**
   * Set new item in Database
   * 
   * @param {Object} data 
   * @returns 
   */
  async setItem (data) {
    const store = await this.store();
    store.put(data);

    return data;
  }


  /**
   * Update item Database
   * 
   * @param {Object} data 
   * @returns 
   */
   async updateItem (data) {
    const store = await this.store();
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

  /**
   * Simplifying request data, returning only useful data
   * 
   * @param {Object} pokemon 
   * @returns 
   */
   getPokemonData (pokemon) {
    return {
      name: pokemon.name,
      id: pokemon.id,
      image: pokemon.sprites.other['official-artwork'].front_default,
      element: pokemon.types,
      weight: pokemon.weight,
      height: pokemon.height,
      species: pokemon.species,
      abilities: pokemon.abilities.map((item) => ({ ...item.ability, is_hidden: item.is_hidden })),
      types: pokemon.types.map((type) => type.type.name),
      moves: pokemon.moves.map(item => item.move.name),
      eggs: pokemon.eggs,
      evolution_chain: pokemon.evolution_chain,
      stats: pokemon.stats.map((stat) => ({
        value: stat.base_stat,
        name: stat.stat.name,
      })),
    }
  }
}

export default new Database();