import './details.scss';
import html from './details.html?raw';
import { HTMLParser } from '../../../util/DOMParse';
import { numberFormat, nameFormat } from '../../../util/formatter';
import NavbarController from './navbar/navbar.controller';

import AboutController from './contents/about/about.controller';
import StatsController from './contents/stats/stats.controller';
import EvolutionController from './contents/evolution/evolution.controller';
import MovesController from './contents/moves/moves.controller';
import { tabsEnum } from '../../../enums/navbar.enum';

export default class DetailsController {

  constructor (payload) {
    this.element = HTMLParser(html);
    this.payload = payload;
    
    this.closeEl = this.element.querySelector('.close');
    this.imageEl = this.element.querySelector('.image');
    this.nameEl = this.element.querySelector('.name');
    this.numberEl = this.element.querySelector('.number');
    this.typeEl = this.element.querySelector('.type');
    this.weightEl = this.element.querySelector('.weight');
    this.heightEl = this.element.querySelector('.height');
    this.contentEl = this.element.querySelector('.content');

    this.close();
    this.setBackgroundColor();
    this.setImage();
    this.setName();
    this.setNumber();
    this.setFooterInfo();
    this.setContentElements();
  }

  /**
   * Set background color according element
   */
  setBackgroundColor () {
    this.element.classList.add('bg-color-fire');
  }

  /**
   * Set image
   */
   setImage() {
     const image = this.payload.sprites.other['official-artwork'].front_default;
     const imageEl = document.createElement('img');
     imageEl.src = image;
    this.imageEl.appendChild(imageEl);
  }

  /**
   * Set name
   */
   setName() {
    this.nameEl.innerHTML = nameFormat(this.payload.name);
  }

  /**
   * Set id number
   */
  setNumber() {
    this.numberEl.innerHTML = `#${numberFormat(this.payload.id)}`;
  }

  /**
   * Set id number
   */
  setFooterInfo() {
    this.typeEl.innerHTML = nameFormat(this.payload.types[0].type.name);
    this.weightEl.innerHTML = this.payload.weight / 10;
    this.heightEl.innerHTML = this.payload.height / 10;
  }

  /**
   * Set content elements
   */
  setContentElements() {
    // Navbar
    const navbarEl = new NavbarController();

    // Content
    this.contentEl.appendChild(navbarEl.element);
    this.contentEl.appendChild(new StatsController(this.payload).element);

    // Tab change event
    navbarEl.onTabChange((tab) => {
      
      this.contentEl.lastChild.remove();

      switch (tab) {
        case tabsEnum.STATS:
          this.contentEl.appendChild(new StatsController(this.payload).element)
          break;
        case tabsEnum.EVOLUTION:
          this.contentEl.appendChild(new EvolutionController(this.payload).element)
          break;
        case tabsEnum.MOVES:
          this.contentEl.appendChild(new MovesController(this.payload).element)
          break;
        case tabsEnum.ABOUT:
        default:
          this.contentEl.appendChild(new AboutController(this.payload).element)
          break;
      }
    });
  }

  /**
   * Close detail
   */
  close () {
    this.closeEl.addEventListener('click', (event) => {
      this.element.remove();
    });
  }

}