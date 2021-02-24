import emailLeftMenu from '../cmps/email-left-menu.cmp.js';
import emailFilters from '../cmps/email-filters.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import emailRead from './email-read-page.cmp.js';

import { emailService } from '../services/mail.service.js';

export default {
    template: /*html*/ `
    <div className="main-size bg-primary contain-app">
        <div class="email-filters-list-wrapper">
            <email-filters></email-filters>
        </div>
        <div class="mail-container flex j-between">
            <email-left-menu></email-left-menu>
            <email-list :emails="emails"></email-list>
        </div>
    </div>`,
    data() {
        return {
            emails: [],
            currEmailRead: null,
        };
    },
    methods: {
        // setReadEmail(email) {
        //     this.currEmailRead = email;
        //     console.log('  this.currEmailRead:', this.currEmailRead);
        // },
    },
    components: {
        emailLeftMenu,
        emailFilters,
        emailList,
        emailRead,
    },
    created() {
        emailService
            .query('isTrashed', false)
            .then((emails) => {
                this.emails = emails;
                console.log(' this.emails:', this.emails);
            })
            .catch((err) => {
                console.error(err);
            });
    },
};
