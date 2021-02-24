export default {
    template: /*html*/ `
        <div class="email-list flex column">
            <div v-for="(email,idx) in emails" class="email-container flex" :key="email.id">
                <div class="favorite">star</div>
                <div class="read"></div>
                <div class="subject">
                    {{email.subject}}
                </div>
                <div class="created-at">
                    {{email.sentAt}}
                </div>
            </div>
        </div>`,
    props: ['emails'],
    data() {
        return {};
    },
    methods: {},
    created() {
        console.log(this.emails);
    },
};
