import emailLeftMenu from '../cmps/email-left-menu.cmp.js';
import emailFilters from '../cmps/email-filters.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import emailRead from './email-read-page.cmp.js';

import { emailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/eventBus.service.js';

export default {
    template: /*html*/ `
    <div class=" mail-app main-size bg-primary contain-app ">
        <div class="email-filters-list-wrapper">
            <email-filters 
                @filterSelected="getFilteredEmails" 
                @inputSearchStr="getEmailsBySearch"></email-filters>
        </div>
        <div class="mail-container flex j-between">
            <email-left-menu  @filterSelected="getFilteredEmails"></email-left-menu>
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
        getFilteredEmails(filterBy) {
            let filterSettings = { filter: 'all', bool: false };
            switch (filterBy) {
                case 'read':
                    filterSettings = { filter: 'isRead', bool: true };
                    break;
                case 'unread':
                    filterSettings = { filter: 'isRead', bool: false };
                    break;
                case 'favorites':
                    filterSettings = { filter: 'isFavorite', bool: true };
                    break;
                case 'favorites':
                    filterSettings = { filter: 'isFavorite', bool: true };
                    break;
                case 'inbox':
                    filterSettings = { filter: 'isTrashed', bool: false };
                    break;
                case 'trash':
                    filterSettings = { filter: 'isTrashed', bool: true };
                    break;
            }
            console.log('filterSettings:', filterSettings);

            emailService
                .query(filterSettings.filter, filterSettings.bool)
                .then((emails) => {
                    if (!emails || !emails.length) {
                        this.emails = [];
                        return;
                    }
                    this.emails = emails;
                    console.log(' this.emails:', this.emails);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        getEmailsBySearch({ subject, body }) {
            console.log('searchStr from emit:', { subject, body });
            emailService
                .searchEmailsForSearchStr({ subject, body })
                .then((emails) => {
                    this.emails = emails;
                    console.log(' this.emails:', this.emails);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        getInbox() {
            emailService
                .query('isTrashed', false)
                .then((emails) => {
                    this.emails = emails;
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        handleResize(size) {
            console.log('size:', size);
        },
    },
    components: {
        emailLeftMenu,
        emailFilters,
        emailList,
        emailRead,
    },
    mounted() {},

    created() {
        eventBus.$on('resizedWidth', this.handleResize);
        eventBus.$on('reloadEmails', this.getInbox);
        this.getInbox();
    },
    destroyed() {
        eventBus.$off('reloadEmails', this.getInbox);
        eventBus.$off('resizedWidth', this.handleResize);
    },
};
