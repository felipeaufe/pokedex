import { HTMLParser } from '../../../util/DOMParse';
import { searchEnum } from '../../../enums/search.enum';
import Database from '../../../database/database';
import ApiService from '../../../services/api.service';
import html from './header.html?raw';
import './header.scss';

export default class HeaderController {
  constructor () {
    this.element = HTMLParser(html)
    this._onSearch = () => {};

    this.inputEl = this.element.querySelector('input');
    this.inputEl.addEventListener('keydown', (event)=> this.pressEnter(event));

    this.submitEl = this.element.querySelector('button');
    this.submitEl.addEventListener('click', () => this.search());
  }

  /**
   * Enter key press event
   * 
   * @param {Event} event 
   */
  pressEnter (event) {
    if(event.code === "Enter") {
      this.search();
    }
  }

  /**
   * Search key in Database or Api Service
   */
  async search() {

    // Search in database
    const value = this.inputEl.value.toLowerCase();

    if(value.length == 0) {
      return this._onSearch(searchEnum.NO_SEARCH);
    }

    let pokemon = await Database.getByName(value);
    
    if(pokemon) {
      return this._onSearch(pokemon);
    }


    // Search in Api Service
    pokemon = await ApiService.getPokemon(value);

    if(pokemon) {
      pokemon = Database.getPokemonData(pokemon);
      Database.setItem(pokemon);

      return this._onSearch(pokemon);
    }
  }

  /**
   * Callback function 
   * 
   * @param {Function} callback 
   */
  onSearch (callback) {
    if(typeof callback == 'function') {
      this._onSearch = callback;
    }
  }
}