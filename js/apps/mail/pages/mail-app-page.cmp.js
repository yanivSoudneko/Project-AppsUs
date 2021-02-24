import emailLeftMenu from '../cmps/email-left-menu.cmp.js';
import emailFilters from '../cmps/email-filters.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import emailRead from '../cmps/email-read.cmp.js';

import { emailService } from '../services/mail.service.js';

export default {
    template: /*html*/ `
        <div class="email-filters-list-wrapper main-size bg-primary contain-app">
            <email-filters></email-filters>
            <email-list :emails="filteredEmails"></email-list>
            <email-read></email-read>
            <email-left-menu></email-left-menu>
        </div>`,
    data() {
        return {
            emails: [],
        };
    },
    components: {
        emailLeftMenu,
        emailFilters,
        emailList,
        emailRead,
    },
    created() {
        emailService
            .query()
            .then((emails) => {
                this.emails = emails;
                console.log(' this.emails:', this.emails);
            })
            .catch((err) => {
                console.error(err);
            });
    },
};
