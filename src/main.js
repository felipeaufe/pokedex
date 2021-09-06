import HomeController from './components/home/home.controller';

import './assets/sass/base.scss'

var app = document.querySelector('#app');

app.classList.add('theme-default');

app.appendChild(new HomeController().element);