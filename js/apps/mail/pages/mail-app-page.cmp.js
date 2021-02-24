import emailLeftMenu from '../cmps/email-left-menu.cmp.js';
import emailFilters from '../cmps/email-filters.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import emailRead from '../cmps/email-read.cmp.js';

export default {
    template: /*html*/ `
        <div class="main-size bg-primary contain-app">
            <email-left-menu></email-left-menu>
            <div class="email-filters-list-wrapper">
                <email-filters></email-filters>
                <email-list :emails="filteredEmails"></email-list>
                <email-read></email-read>
            </div>
        </div>`,
    data() {
        return {};
    },
    computed: {
        filteredEmails() {},
    },
    components: {
        emailLeftMenu,
        emailFilters,
        emailList,
        emailRead,
    },
    created() {},
};
