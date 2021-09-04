import './home.scss';
import html from './home.html?raw';
import { HTMLParser } from '../../util/DOMParse';

export default class HomeController {

  constructor () {
    this.element = HTMLParser(html);
  }
}