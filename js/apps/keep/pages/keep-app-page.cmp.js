import noteTxt from '../cmps/note-txt.cmp.js'
// import { keepService } from '../services/keep-service.js'

export default {
    template: `
    <div class="main-container">
        <form @submit.prevent="save">
            <div v-for="(cmp, idx) in info.cmps">
            {{cmp}}
            </div>
            <button>Save</button>
        </form>
        <input class="search-bar" type="text" placeholder="Search..." value>
        <h2>Pinned</h2>
        <div class="pinned"></div>
        <div class="unpinned"></div>
        <div></div>
    </div>`,
    data() {
        return {};
    },
    methods: {
        setAns(ans, idx) {
            console.log('Setting the answer: ', ans, 'idx:', idx);

            this.answers.splice(idx, 1, ans)

        },
        save() {
            console.log('Saving..', this.answers);
        }
    },
    components: {
        noteTxt
    },
};