import noteText from './note-txt.cmp.js';
import noteList from './note-list.cmp.js';
import noteImage from './note-image.cmp.js';
import noteVideo from './note-video.cmp.js';
import noteForm from './create-note-form.cmp.js';

export default {
    props: ['note'],
    template: /*html*/ `
        <div class="note-container" :style="{'background-color':bgColor,'border-color':borderColor}">
        <div class="top-note">
            <button class="note-btn" @click="deleteNote()">x</button>
            <div class="flex">
            <input ref="bgColInput" type="color" v-model="bgColor" style="visibility:hidden"/>
            <div class="color-sec" @click="openColInput('bgColInput')">
            <img class="note-color-img" src="images/fill.png"/>
            </div>
            <input ref="borderColInput" type="color" v-model="borderColor" style="visibility:hidden"/>
            <div class="color-sec" @click="openColInput('borderColInput')">
                <img class="note-color-img" src="images/bgc.png"/>
                </div>
            </div>
            </div>
            <h3>{{note.title}}</h3>
            
            <div 
            class="note-content-container"                
            v-for="(content,idx) in note.content" 
            :key="content.id">
            <button @click="removeContentFromNote(content.id)">x</button>
            <component 
            :is="'note-' + content.type" 
            :content="content"></component>
            </div>
            
            
            <div class="note-date">{{parsedDate}}</div>
            <note-form @noteSectionMade="addContentToNote" :noteId="note.id"></note-form>
        </div>`,
    data() {
        return {
            bgColor: null,
            borderColor: null,
        };
    },
    watch: {
        bgColor() {
            if (!this.note.style) this.note.style = {};
            this.note.style.bgColor = this.bgColor;
            this.$emit('noteUpdated', this.note);
        },
        borderColor() {
            if (!this.note.style) this.note.style = {};
            this.note.style.borderColor = this.borderColor;
            this.$emit('noteUpdated', this.note);
        },
    },
    methods: {
        openColInput(refName) {
            this.$refs[refName].focus();
            this.$refs[refName].click();
        },
        addContentToNote(content) {
            console.log('emitted up:', content);
            this.note.content.push(content);
            console.log('this.note:', this.note);
            this.$emit('noteUpdated', this.note);
        },
        deleteNote() {
            const noteId = this.note.id;
            console.log('noteId:', noteId);
        },
        removeContentFromNote(id) {
            console.log('content id:', id, { note: this.note.content });
        },
    },
    computed: {
        parsedDate() {
            return new Date(this.note.createdAt).toDateString();
        },
    },
    components: {
        noteText,
        noteList,
        noteImage,
        noteVideo,
        noteForm,
    },
    created() {
        if (this.note.style) {
            this.bgColor = this.note.style.bgColor;
            this.borderColor = this.note.style.borderColor;
        }
    },
};

//    <component v-for="(note,idx) in notes" :is="'note-' + note.type" :note="note"></component>