
import './about.scss';
import html from './about.html?raw';
import { HTMLParser } from '../../../../../util/DOMParse';
import { nameFormat } from '../../../../../util/formatter';

export default class AboutController {

  constructor (payload) {
    this.element = HTMLParser(html);
    this.payload = payload;

    this.speciesEl = this.element.querySelector('.species');
    this.heightEl = this.element.querySelector('.height');
    this.weightEl = this.element.querySelector('.weight');
    this.abilitiesEl = this.element.querySelector('.abilities');
    this.genderEl = this.element.querySelector('.gender');
    this.eggGroupsEl = this.element.querySelector('.egg-groups');
    this.eggCycleEl = this.element.querySelector('.egg-cycle');

    this.setAttributes();
  }

  /**
   * Set attribute data
   */
  setAttributes () {
    this.speciesEl.innerHTML = nameFormat(this.payload.species.name);
    this.heightEl.innerHTML = this.payload.height / 10 + 'm';
    this.weightEl.innerHTML = this.payload.weight / 10 + 'kg';
    this.abilitiesEl.innerHTML = this.payload.abilities.map((val) => val.ability.name).join(', ');
    this.genderEl.innerHTML = "____";
    this.eggGroupsEl.innerHTML = "____";
    this.eggCycleEl.innerHTML = "____";
  }
}