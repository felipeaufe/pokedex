
import './moves.scss';
import html from './moves.html?raw';
import { HTMLParser } from '../../../../../util/DOMParse';

export default class MovesController {

  constructor () {
    this.element = HTMLParser(html);
  }
}