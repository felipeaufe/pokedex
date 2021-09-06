
import './evolution.scss';
import html from './evolution.html?raw';
import { HTMLParser } from '../../../../../util/DOMParse';
import { nameFormat, numberFormat } from '../../../../../util/formatter';
import ApiService from '../../../../../services/api.service';
import Database from '../../../../../database/database';

export default class EvolutionController {

  constructor (payload) {
    this.element = HTMLParser(html);
    this.payload = payload;

    this.listEl = this.element.querySelector('.list');
    this.listPokemon = [];

    this.getEvolution();
  }

  /**
   * Populating DOM with pokemon info
   * 
   * @param {Object} pokemon 
   */
  setAttributes (pokemon) {
    const itemEl = document.createElement('div');
    const detailsEl = document.createElement('div');
    const imageEl = document.createElement('div');
    const nameEl = document.createElement('div');
    const numberEl = document.createElement('div');
    const typeEl = document.createElement('div');

    itemEl.classList.add('item');

    detailsEl.classList.add('details');
    
    imageEl.classList.add('image');
    imageEl.style.backgroundImage = `url('${pokemon.image}')`;
    
    nameEl.classList.add('name');
    nameEl.innerHTML = nameFormat(pokemon.name);

    numberEl.classList.add('number');
    numberEl.innerHTML = numberFormat(pokemon.id);

    typeEl.classList.add('type');
    typeEl.innerHTML = 'Type: ' + pokemon.types[0];

    detailsEl.appendChild(numberEl);
    detailsEl.appendChild(nameEl);
    detailsEl.appendChild(typeEl);
    
    itemEl.appendChild(imageEl);
    itemEl.appendChild(detailsEl);

    this.listEl.appendChild(itemEl);
  }

  /**
   * Get evolutions
   */
  async getEvolution () {
    if(!this.payload.evolution) {
      const id = this.payload.evolution_chain.split('evolution-chain/')[1].replace('/', '');
      this.payload.evolution = (await ApiService.getEvolution(id)).chain;

      Database.updateItem(this.payload);
    }

    this.setPokemonList(this.payload.evolution).then(() => {
      for(let index = 0; index < this.listPokemon.length; index++) {
        this.setAttributes(this.listPokemon[index]);
      }
    });
  }

  /**
   * Create a list of evolutions
   * 
   * @param {Object} evolution 
   */
  async setPokemonList (evolution) {
    let pokemon = await Database.getByName(evolution.species.name);

    if (!pokemon) {
      pokemon = await ApiService.getPokemon(evolution.species.name);
      pokemon = Database.getPokemonData(pokemon);

      await Database.setItem(pokemon);
    }

    this.listPokemon.push(pokemon);

    if(evolution.evolves_to.length) {

      for(let index = 0; index < evolution.evolves_to.length; index++) {
        await this.setPokemonList(evolution.evolves_to[index]);
      }
    }
  }
}