import './navbar.scss';
import html from './navbar.html?raw';
import { nameFormat } from '../../../../util/formatter';
import { HTMLParser } from '../../../../util/DOMParse';
import { tabsEnum } from '../../../../enums/navbar.enum';

export default class NavbarController {

  constructor () {
    this.element = HTMLParser(html);
    this.tabsEl = null;

    this.setTabsElement();
    this.onTabChangeCallback = () => {};
    this.setTabClick();
  }

  /**
   * Create tabs element
   */
  setTabsElement () {
    const ulEl = this.element.querySelector('ul');

    [
      tabsEnum.ABOUT,
      tabsEnum.STATS,
      tabsEnum.EVOLUTION,
      tabsEnum.MOVES,
    ].forEach((value) => {
      const tabEl = document.createElement('li');

      tabEl.setAttribute('data-tab', value);
      tabEl.innerHTML = value === tabsEnum.STATS ? 'Base Stats' : nameFormat(value);

      ulEl.appendChild(tabEl);
    });

    this.tabsEl = this.element.querySelectorAll('li');
    this.tabsEl[0].classList.add('active');
  }

  /**
   * Set event click
   */
  setTabClick () {
    this.tabsEl.forEach((tab) => {
      tab.addEventListener('click', (event) => {
        
        if(!event.target.classList.contains('active')) {
          const tabName = event.target.getAttribute('data-tab');
          this.setActive(event.target);
          this.onTabChangeCallback(tabName);
        }

      })
    });
  }

  /**
   * Remove all active class and add on target element
   * 
   * @param {DOMElement} tabEl 
   */
  setActive(tabEl) {
    this.tabsEl.forEach((tab) => tab.classList.remove('active'));
    tabEl.classList.add('active');
  }

  /**
   * Set callback function
   * 
   * @param {Function} callback 
   */
  onTabChange (callback) {
    this.onTabChangeCallback = callback;
  }
}