export default {
    template: /*html*/ `
        <div class="email-container flex a-center">
            <div class="favorite star" :class="{'yellow-star': email.isFavorite}">&#9733;</div>
            <div class="read" @click="isRead = !isRead">{{isReadSymbol}}</div>
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
    computed: {
        isReadSymbol() {
            return this.email.isRead ? '📖' : '📕';
        },
        parsedDate() {
            return new Date(this.email.sentAt).toDateString();
        },
    },
};
