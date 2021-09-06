import { HTMLParser } from '../../../util/DOMParse';
import html from './header.html?raw';
import './header.scss';

export default class HeaderController {
  constructor () {
    this.element = HTMLParser(html)
  }
}