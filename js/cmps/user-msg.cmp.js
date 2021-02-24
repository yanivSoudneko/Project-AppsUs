import { eventBus } from '../services/eventBus.service.js';

export default {
    template: /*html*/ `
        <section v-if="msg" class="user-msg" :class="msg.type">
            <p>{{msg.txt}}</p>
        </section>
    `,
    data() {
        return {
            msg: null,
        };
    },
    methods: {
        setMsg({ txt, type }) {
            this.msg = { txt, type };
            console.log('  this.msg:', this.msg);
            setTimeout(() => {
                this.msg = null;
            }, 3000);
        },
    },
    created() {
        eventBus.$on('show-msg', this.setMsg);
    },
    destroyed() {
        eventBus.$off('show-msg', this.setMsg);
    },
};
