import noteForm from '../cmps/create-note-form.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
import noteContainer from '../cmps/note-container.cmp.js';
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
                <div class="pinned" v-for="(note) in pinnedNotes" :key="note.id">
                    <note-container :note="note"></note-container>
                </div>
                <div class="unpinned" v-for="(note) in unPinnedNotes" :key="note.id">
                    <note-container :note="note"></note-container>
                </div>
        </div>`,
    data() {
        return {
            answers: null,
            notes: [],
            searchStr: '',
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
        pinnedNotes() {
            return this.notes.filter((note) => note.isPinned);
        },
        unPinnedNotes() {
            return this.notes.filter((note) => !note.isPinned);
        },
    },
    components: {
        noteForm,
        noteFilter,
        noteContainer,
    },
};
