import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
import keepApp from './apps/keep/pages/keep-app-page.cmp.js';
import mailApp from './apps/mail/pages/mail-app-page.cmp.js';
import bookApp from './apps/book/pages/book-app.cmp.js'
import bookDetails from './apps/book/pages/book-details.cmp.js'
import bookAddPage from './apps/book/pages/book-add-page.cmp.js'

const routes = [
    { path: '/', component: homePage },
    { path: '/about', component: aboutPage },
    {
        path: '/book',
        component: bookApp,
        children: [{
                path: '/book/add',
                component: bookAddPage,
            },
            {
                path: '/book/details/:bookId',
                component: bookDetails,
            },
        ]
    },
    { path: '/keep', component: keepApp, children: [] },
    { path: '/mail', component: mailApp, children: [] },
];

export const mainRouter = new VueRouter({ routes });