
import './stats.scss';
import html from './stats.html?raw';
import { HTMLParser } from '../../../../../util/DOMParse';
import { nameFormat } from '../../../../../util/formatter';

export default class StatsController {

  constructor (payload) {
    this.element = HTMLParser(html);
    this.payload = payload;

    this.hpEl = this.element.querySelector('.hp');
    this.attackEl = this.element.querySelector('.attack');
    this.defenceEl = this.element.querySelector('.defence');
    this.spatkEl = this.element.querySelector('.spatk');
    this.spdefEl = this.element.querySelector('.spdef');
    this.speedEl = this.element.querySelector('.speed');
    this.totalEl = this.element.querySelector('.total');

    this.noteEl = this.element.querySelector('.note');

    this.setValues();
  }


  /**
   * Set properties's value
   */
  setValues () {
    const hp = this.findStatsProperty('hp');
    const attack = this.findStatsProperty('attack');
    const defence = this.findStatsProperty('defense');
    const spatk = this.findStatsProperty('special-attack');
    const spdef = this.findStatsProperty('special-defense');
    const speed = this.findStatsProperty('speed');

    this.valueConfig(this.hpEl, hp);
    this.valueConfig(this.attackEl, attack);
    this.valueConfig(this.defenceEl, defence);
    this.valueConfig(this.spatkEl, spatk);
    this.valueConfig(this.spdefEl, spdef);
    this.valueConfig(this.speedEl, speed);

    // Total
    this.totalEl.querySelector('.value').innerHTML = [hp,attack,defence,spatk,spdef,speed].reduce((accumulator, currentValue) => accumulator + currentValue);
    this.totalEl.querySelector('div').style.width = '100%';

    // Note
    this.noteEl.innerHTML = `The effectiveness of each types on ${nameFormat(this.payload.name)}`;
  }

  /**
   * Populate element
   * 
   * @param {DOMElement} element 
   * @param {Number} value 
   */
  valueConfig (element, value) {
    element.querySelector('.value').innerHTML = value;
    element.querySelector('div').style.width = `${value}%`;
    
    if(value < 50) {
      element.classList.add('bg-red');
    } else if(value < 70) {
      element.classList.add('bg-yellow');
    } else {
      element.classList.add('bg-green');
    }
  }

  /**
   * Search state value by property
   * 
   * @param {String} property 
   * @returns State value
   */
  findStatsProperty(property) {
    return (this.payload.stats.find((value) => value.name === property)).value;
  }

}