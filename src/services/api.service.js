import { env } from '../environment';

let instance = null;

class ApiService {
  
  constructor () {

    this.headers = new Headers();

    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Origin','http://localhost:3000');

    if(!instance){
      instance = this;
    }
    return instance;
  }

  async getPokemon( idName ) {
   const pokemon = await this.request('pokemon/', idName);
   const specie = await this.request('pokemon-species/', idName);

    return {
      ...pokemon,
      eggs: specie.egg_groups.map((egg) => egg.name),
      evolution_chain: specie.evolution_chain.url
    }
  }

  getPokemonSpecie (idName) {
    return this.request('pokemon-species/', idName);
  }

  getEvolution( id ) {
    return this.request('evolution-chain/', id);
  }

  listPokemon (next) {

    if(next) {
      const offset = next.split('?');
      return this.request('pokemon/', '?'+offset);
    }

    return this.request('pokemon/');
  };

  async request (endpoint, value = '', type = 'GET') {
    const response = await fetch(env.api.url + endpoint + value, { method: type, mode: 'cors',});

    if (response.status === 200) {
      return await response.json();
    }

    throw new Error(response);
  }
}

export default new ApiService();