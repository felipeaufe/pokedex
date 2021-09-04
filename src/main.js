import HeaderController from './components/header/header.controller';
import FooterController from './components/footer/footer.controller';
import HomeController from './views/home/home.controller';

import './assets/sass/base.scss'

var app = document.querySelector('#app');

app.appendChild(new HeaderController().element);
app.appendChild(new HomeController().element);
app.appendChild(new FooterController().element);