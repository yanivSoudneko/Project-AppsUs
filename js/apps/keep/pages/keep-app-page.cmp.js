import noteForm from '../cmps/create-note-form.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
import noteText from '../cmps/note-txt.cmp.js';
import noteList from '../cmps/note-list.cmp.js';
import noteImage from '../cmps/note-image.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import { keepService } from '../services/keep.service.js';

export default {
    template: /*html*/ `
        <div class="main-container">
            <h1>Create Note:</h1>
            <note-form></note-form>
            <hr/>
            <note-filter></note-filter>
            <hr/>
            <h2>Pinned</h2>
            <div class="pinned">
                <component v-for="(note,idx) in notes" :is="'note-' + note.type" :note="note"></component>
            </div>
            <div class="unpinned"></div>
        </div>`,
    data() {
        return {
            answers: null,
            notes: [],
            searchStr: '',
            bullshit: ['note-text', 'note-video', 'note-image'],
        };
    },
    methods: {
        save() {
            console.log('Saving..', this.answers);
        },
    },
    created() {
        keepService.query().then((notes) => {
            this.notes = notes;
            console.log(' this.notes :', this.notes);
        });
    },
    computed: {
        noteType() {
            return 'note-video';
        },
    },
    components: {
        noteForm,
        noteFilter,
        noteText,
        noteList,
        noteImage,
        noteVideo,
    },
};
