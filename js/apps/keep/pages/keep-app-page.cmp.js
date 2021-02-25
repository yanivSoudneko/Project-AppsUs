import noteForm from '../cmps/create-note-form.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
import noteContainer from '../cmps/note-container.cmp.js';
import { keepService } from '../services/keep.service.js';
import { eventBus } from '../../../services/eventBus.service.js';
export default {
    template: /*html*/ `
        <div class="main-container-keep main-size bg-primary contain-app">
            <h1 class="note-header">Create Note:</h1>
            <note-form @refreshNoteList="getNotes"></note-form>
            <hr/>
            <note-filter @emitedSearchTerm="filterBySearchTerm"></note-filter>
            <hr/>
            <h2>Pinned</h2>
            <hr/>
            <div class="pinned" v-for="(note) in pinnedNotes" :key="note.id">
            <note-container :note="note" @removeSegemntFromNote="removeSegment" @removeNote="deleteNote" @noteUpdated="saveUpdatedNote"></note-container>
            </div>
            <hr/>
            <h2>UnPinned</h2>
            <div class="notes-container">
            <div class="unpinned" v-for="(note) in unPinnedNotes" :key="note.id">
            <note-container :note="note"   @removeSegemntFromNote="removeSegment" @removeNote="deleteNote" @noteUpdated="saveUpdatedNote"></note-container>
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
        saveUpdatedNote(note) {
            console.log('note Updated:', note);
            keepService.saveNote(note).then((note) => {
                this.getNotes();
            });
        },
        deleteNote(id) {
            keepService.removeNote(id).then((res) => {
                this.getNotes();
            });
        },
        removeSegment({ noteId, segmentId }) {
            console.log(' noteId, segmentId:', { noteId, segmentId });
            const targetNote = this.notes.filter(({ id }) => id === noteId)[0];
            targetNote.content = targetNote.content.filter(
                ({ id }) => id != segmentId,
            );

            if (!targetNote.content.length) {
                this.deleteNote(noteId);
            }

            keepService.saveNote(targetNote).then((note) => {
                eventBus.$emit('show-msg', {
                    txt: 'note updated',
                    type: 'success',
                });
                this.getNotes();
            });
        },
        getNotes() {
            console.log('hello emit?');
            keepService.query().then((notes) => {
                this.notes = notes;
                console.log(' this.notes :', this.notes);
            });
        },
        filterBySearchTerm(searchTerm) {
            keepService.filterNotesBySearchTerm(searchTerm).then((notes) => {
                console.log('in app page', { searchTerm, notes });
                this.notes = notes;
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
