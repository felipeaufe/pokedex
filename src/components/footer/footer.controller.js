import { HTMLParser } from '../../util/DOMParse';
import html from './footer.html?raw';

export default class FooterController {
  constructor () {
    this.element = HTMLParser(html)
  }
}