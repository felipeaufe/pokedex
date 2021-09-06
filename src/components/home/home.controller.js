import './home.scss';
import html from './home.html?raw';
import HeaderController from './header/header.controller';
import CardController from './card/card.controller';
import DetailsController from './details/details.controller';
import { HTMLParser } from '../../util/DOMParse';
import InfiniteScroll from '../../util/InfiniteScroll';
import { searchEnum } from '../../enums/search.enum';
import ApiService from '../../services/api.service';
import Database from '../../database/database';

export default class HomeController {

  constructor () {
    const headerController = new HeaderController();
    this.listPokemonResponse = undefined; 
    this.element = HTMLParser(html);
    this.executed = false;
    
    this.element.appendChild(headerController.element);
    this.scrollBoxEl = this.element.querySelector('.scroll-box');
    this.cardListEl = this.element.querySelector('.card-list');

    this.loadingEl = this.element.querySelector('.loading');

    this.InfiniteScroll();
    this.getPokemonList();
    
    headerController.onSearch((pokemon) => this.searchPokemon(pokemon));
  }

  /**
   * Get paginated pokemon list from API
   */
  async getPokemonList(next) {
    this.listPokemonResponse = (await ApiService.listPokemon(next));

    const list = [];

    for(let index = 0; index < this.listPokemonResponse.results.length; index++) {

      let pokemon = await Database.getByName(this.listPokemonResponse.results[index].name);

      if(!pokemon) {
        pokemon = await ApiService.getPokemon(this.listPokemonResponse.results[index].name)
        pokemon = Database.getPokemonData(pokemon);

        await Database.setItem(pokemon);
      }

      list.push(pokemon);
    }

    return this.populateList(list);
  }

  /**
   * Show search result
   * 
   * @param {Object} pokemon 
   */
  searchPokemon (pokemon) {
    console.log({pokemon})
    if(pokemon === searchEnum.NO_VALUE) {
      this.listPokemonResponse = undefined;
      this.cardListEl.innerHTML = "";
      this.getPokemonList();

    } else if(pokemon === searchEnum.NOT_FOUND) {
      this.listPokemonResponse = undefined;
      this.cardListEl.innerHTML = "";
      
    } else if(pokemon) {
      this.listPokemonResponse = undefined;
      this.cardListEl.innerHTML = "";
      this.populateList([ pokemon ]);
    }
  }

  /**
   * Populate view card list
   * 
   * @param {Array} list 
   */
  populateList (list) {

    for(let index = 0; index < list.length; index ++) {
      const cardEl = new CardController(list[index]).element;
      this.cardListEl.appendChild(cardEl);

      cardEl.addEventListener('click', (event) => {
        this.element.appendChild(new DetailsController(list[index]).element);
      });
    }
  }

  /**
   * Configuration Infinite Scroll
   */
  InfiniteScroll () {
    new InfiniteScroll(this.scrollBoxEl).loadMore(() => {
      this.loadMore();
    });
  }

  /**
   * Load more pokemons
   */
  loadMore () {
    const next = this.listPokemonResponse.next.split('?')[1];

    console.log('loadMore');

    const execute = (() => {

      return () => {
        if (!this.executed) {
          this.loadingEl.classList.add('show');
          this.scrollBoxEl.scrollTop = this.scrollBoxEl.scrollHeight;
          this.executed = true;
        
          this.getPokemonList(next)
          .finally(() => {
            this.loadingEl.classList.remove('show');
            
            setTimeout(() => {
              this.executed = false;
            }, 100);
          })
        }
      };
    })();

    execute();
  }
}