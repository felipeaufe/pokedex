import './home.scss';
import html from './home.html?raw';
import HeaderController from './header/header.controller';
import CardController from './card/card.controller';
import DetailsController from './details/details.controller';
import { HTMLParser } from '../../util/DOMParse';
import ApiService from '../../services/api.service';
import Database from '../../database/database';

export default class HomeController {

  constructor () {
    this.element = HTMLParser(html);
    this.element.appendChild(new HeaderController().element);

    this.getPokemonList();
  }


  /**
   * Get paginated pokemon list from API
   */
  async getPokemonList() {
    const response = await ApiService.listPokemon();
    const list = [];

    for(let index = 0; index < response.results.length; index++) {

      let pokemon = await Database.getByName(response.results[index].name);

      if(!pokemon) {
        pokemon = await ApiService.getPokemon(response.results[index].name)
        pokemon = Database.getPokemonData(pokemon);

        await Database.setItem(pokemon);
      }

      list.push(pokemon);
    }

    this.populateList(list);
  }


  /**
   * Populate view card list
   * 
   * @param {Array} list 
   */
  populateList (list) {

    for(let index = 0; index < list.length; index ++) {
      const cardEl = new CardController(list[index]).element;
      this.element
        .querySelector('.card-list')
        .appendChild(cardEl);
      cardEl.addEventListener('click', (event) => {
        this.element.appendChild(new DetailsController(list[index]).element);
      });
    }
  }
}