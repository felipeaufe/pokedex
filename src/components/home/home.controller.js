import './home.scss';
import html from './home.html?raw';
import HeaderController from './header/header.controller';
import CardController from './card/card.controller';
import DetailsController from './details/details.controller';
import { HTMLParser } from '../../util/DOMParse';
import charmander from '../../charmander.json';

export default class HomeController {

  constructor () {
    this.element = HTMLParser(html);
    this.element.appendChild(new HeaderController().element);

    this.element.appendChild(new DetailsController(charmander).element);
    
    for(let index = 0; index < 50; index ++) {
      const cardEl = new CardController(charmander).element;
      this.element
        .querySelector('.card-list')
        .appendChild(cardEl);
      cardEl.addEventListener('click', (event) => {
        this.element.appendChild(new DetailsController(charmander).element);
      });
    }
   
  }
}