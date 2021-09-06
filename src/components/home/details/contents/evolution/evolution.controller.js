
import './evolution.scss';
import html from './evolution.html?raw';
import { HTMLParser } from '../../../../../util/DOMParse';

export default class EvolutionController {

  constructor () {
    this.element = HTMLParser(html);
  }
}