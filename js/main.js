import mainHeader from './cmps/header.cmp.js';
import mainFooter from './cmps/footer.cmp.js';

import { mainRouter } from './routes.js';

const template = /*html*/ `
    <div>
        <main-header></main-header>
        <router-view></router-view>
        <main-footer></main-footer>
    </div>`;

const options = {
    el: '#app',
    template,
    router: mainRouter,
    components: { mainHeader, mainFooter },
};

new Vue(options);
