import mainHeader from './cmps/header.cmp.js';
import mainFooter from './cmps/footer.cmp.js';
import userMsg from './cmps/user-msg.cmp.js';

import { mainRouter } from './routes.js';

const template = /*html*/ `
    <div class="main-app">
        <main-header></main-header>
        <router-view></router-view>
        <user-msg></user-msg>
        <main-footer></main-footer>
    </div>`;

const options = {
    el: '#app',
    template,
    router: mainRouter,
    components: { mainHeader, mainFooter, userMsg },
};

new Vue(options);
