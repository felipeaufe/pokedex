import { HTMLParser } from '../../../util/DOMParse';
import { numberFormat, nameFormat } from '../../../util/formatter';
import html from './card.html?raw';
import './card.scss';

export default class CardController {
  
  constructor (payload) {

    this.element = HTMLParser(html)
    this.payload = payload;

    this.nameEl = this.element.querySelector('.name');
    this.numberEl = this.element.querySelector('.number');
    this.imageEl = this.element.querySelector('.image');
    this.elementEl = this.element.querySelector('.element');

    this.setBackgroundColor();
    this.setName();
    this.setNumber();
    this.setImage();
    this.setElements();
  }

  /**
   * Set background color according element
   */
  setBackgroundColor () {
    this.element.classList.add(`bg-color-${this.payload.types[0]}`);
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
   * Set pokemon image
   */
  setImage() {
    this.imageEl.style.backgroundImage = `url('${this.payload.image}')`;
  }

  /**
   * Set element types
   */
  setElements() {
    const types = this.payload.types;

    for(let index = 0; index < types.length; index ++) {
      const typeEl = document.createElement('div') ;
      typeEl.innerHTML = nameFormat(types[index]);
      this.elementEl.appendChild(typeEl);
    }
  }

}