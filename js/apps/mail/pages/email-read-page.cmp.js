import { emailService } from '../services/mail.service.js';

export default {
    template: /*html*/ `
    <div v-if="email" class="email-read main-size bg-primary contain-app">
        <div class="email-subject">{{email.subject}}</div>
        <div class="email-content">{{email.body}}</div>
        <button @click="$router.push('/mail')">Back</button>
        <button>Reply</button>
        <button @click="moveToTrash">{{deleteOrConfirm}}</button>
    </div>`,
    data() {
        return { email: null, confirm: false };
    },
    methods: {
        moveToTrash() {
            if (this.confirm) {
                this.email.isTrashed = true;
                emailService.saveEmail(this.email).then((email) => {
                    console.log('email trahsed:', email);
                    this.$router.push('/mail/');
                });
            }
            this.confirm = true;
        },
    },
    mounted() {
        const { emailId } = this.$route.params;
        console.log('emailId:', emailId);
        emailService.getById(emailId).then((email) => {
            console.log('email:', email);
            this.email = email;
        });
    },
    computed: {
        deleteOrConfirm() {
            return this.confirm ? 'Confirm Delete' : 'Move ToTrash';
        },
    },
};
