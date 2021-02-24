import emailListItem from './email-list-item.cmp.js';
export default {
    template: /*html*/ `
        <div class="email-list flex column">
            <email-list-item v-for="(email,idx) in emails" :email="email" :key="email.id" @click.native="routeToRead(email.id)"></email-list-item>
        </div>`,
    props: ['emails'],
    data() {
        return {
            readMail: null,
        };
    },
    methods: {
        routeToRead(id) {
            console.log('read', id);
            this.$router.push('/mail/' + id);
        },
    },
    created() {
        console.log(this.emails);
    },
    components: {
        emailListItem,
    },
};
