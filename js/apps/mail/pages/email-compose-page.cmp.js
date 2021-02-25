import { emailService } from '../services/mail.service.js';
import { eventBus } from '../../../services/eventBus.service.js';

export default {
    template: /*html*/ `
    <div class="email-compose main-size bg-primary contain-app">
        <div class="email-subject flex column">
            <input name="email-subject" type="text" v-model="email.subject"/>
            <textarea name="email-body" class="email-content" v-model="email.body"></textarea>
        </div>
        <button @click="$router.push('/mail')">Cancel</button>
        <button @click="createNewMail">Send</button>
    </div>`,
    data() {
        return {
            email: { subject: '', body: '' },
            confirm: false,
            isNew: true,
        };
    },
    methods: {
        createNewMail() {
            const { id, subject, body } = this.email;
            if (!subject || subject === '') {
                this.emitToast('Add a subject', 'error');
                return;
            }
            if (!body || body === '') {
                this.emitToast('Cannot send email without a body', 'error');
                return;
            }

            const saveMail = id ? this.email : { subject, body };

            emailService.saveEmail(saveMail).then((email) => {
                console.log('email:', email);
                this.emitToast('Email Sent!...sort off :P', 'success');
                this.$router.push('/mail');
                eventBus.$emit('reloadEmails', true);
            });
        },
        emitToast(txt, type = success) {
            eventBus.$emit('show-msg', { txt, type });
        },
    },
    mounted() {
        const { emailId } = this.$route.query;
        if (emailId) {
            console.log('emailId:', emailId);
            this.isNew = false;
            emailService.getById(emailId).then((email) => {
                console.log('email:', email);
                this.email = email;
                this.email.subject = 'RE:' + this.email.subject;
                this.email.body =
                    this.email.body + '\n----------------------------------\n';
            });
        }
    },
    created() {
        console.log('hello from compose');
    },
    computed: {
        deleteOrConfirm() {
            return this.confirm ? 'Confirm Delete' : 'Move ToTrash';
        },
    },
};
