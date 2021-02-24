import { emailService } from '../services/mail.service.js';

export default {
    template: /*html*/ `
        <div class="email-container flex a-center j-between">
            <div class="flex a-center btn-subject-wrapper ">
        
                <div class="favorite star" @click.stop="email.isFavorite = !email.isFavorite" :class="{yellow: email.isFavorite}">&#9733;</div>
                <div class="read" @click.stop="email.isRead = !email.isRead">{{isReadSymbol}}</div>
                </div>
                <div class="subject">
                    {{email.subject}}
            </div>
            <div class="created-at">
                {{parsedDate}}
            </div>
        </div>
    `,
    props: ['email'],
    data() {
        return {};
    },
    methods: {},
    watch: {
        email: {
            deep: true,
            handler() {
                emailService.saveEmail(this.email).then((email) => this.email);
            },
        },
    },
    computed: {
        isReadSymbol() {
            return this.email.isRead ? '📖' : '📕';
        },
        parsedDate() {
            return new Date(this.email.sentAt).toDateString();
        },
    },
};