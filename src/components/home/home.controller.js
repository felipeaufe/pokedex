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

    // this.element.appendChild(new DetailsController(charmander).element);
    
    // for(let index = 0; index < 50; index ++) {
    //   const cardEl = new CardController(charmander).element;
    //   this.element
    //     .querySelector('.card-list')
    //     .appendChild(cardEl);
    //   cardEl.addEventListener('click', (event) => {
    //     this.element.appendChild(new DetailsController(charmander).element);
    //   });
    // }
  }


  async getPokemonList() {
    const response = await ApiService.listPokemon();
    const list = [];

    for(let index = 0; index < response.results.length; index++) {

      let pokemon = await Database.getByName(response.results[index].name);

      if(!pokemon) {
        pokemon = await ApiService.getPokemon(response.results[index].name)
        Database.setItem(pokemon);
      }

      list.push(pokemon);
    }

    this.populateList(list);
  }


  populateList (list) {

    console.log(list)

    for(let index = 0; index < list.lenght; index ++) {
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