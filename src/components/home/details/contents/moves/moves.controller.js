
import './moves.scss';
import html from './moves.html?raw';
import { HTMLParser } from '../../../../../util/DOMParse';
import { nameFormat } from '../../../../../util/formatter';

export default class MovesController {

  constructor (payload) {
    this.element = HTMLParser(html);
    this.payload = payload;

    this.listEl = this.element.querySelector('ul');

    this.getMoves();
  }


  /**
   * List all moves
   */
  getMoves() {
    for(let index = 0; index < this.payload.moves.length; index++) {
      const moveEl = document.createElement('li');
      let move = nameFormat(this.payload.moves[index])
      move = move.replaceAll('-', ' ');

      moveEl.innerHTML = move;
      this.listEl.appendChild(moveEl);
    }
  }
}