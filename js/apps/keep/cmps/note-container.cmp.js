import noteText from './note-txt.cmp.js';
import noteList from './note-list.cmp.js';
import noteImage from './note-image.cmp.js';
import noteVideo from './note-video.cmp.js';

export default {
    props: ['note'],
    template: /*html*/ `
        <div class="note-container">
            <h3>{{note.title}}</h3>
                <component v-for="(content,idx) in note.content" :is="'note-' + content.type" :content="content" :key="content.id"></component>
            <div class="note-date">{{parsedDate}}</div>
        </div>`,
    data() {
        return {};
    },
    methods: {},
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
    },
};

//    <component v-for="(note,idx) in notes" :is="'note-' + note.type" :note="note"></component>
