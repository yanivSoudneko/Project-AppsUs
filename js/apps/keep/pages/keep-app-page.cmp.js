import noteForm from '../cmps/create-note-form.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
import noteContainer from '../cmps/note-container.cmp.js';
import { keepService } from '../services/keep.service.js';

export default {
    template: /*html*/ `
        <div class="main-container-keep">
            <h1>Create Note:</h1>
            <note-form @refreshNoteList="getNotes"></note-form>
            <hr/>
            <note-filter></note-filter>
            <hr/>
            <h2>Pinned</h2>
            <hr/>
            <div class="pinned" v-for="(note) in pinnedNotes" :key="note.id">
            <note-container :note="note"></note-container>
            </div>
            <h2>UnPinned</h2>
            <hr/>
            <div class="notes-container">
            <div class="unpinned" v-for="(note) in unPinnedNotes" :key="note.id">
            <note-container :note="note"></note-container>
            </div>
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
        getNotes() {
            console.log('hello emit?');
            keepService.query().then((notes) => {
                this.notes = notes;
                console.log(' this.notes :', this.notes);
            });
        },
    },
    created() {
        this.getNotes();
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
