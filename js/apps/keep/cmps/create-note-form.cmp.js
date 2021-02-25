import keepAppPageCmp from '../pages/keep-app-page.cmp.js';
import { keepService } from '../services/keep.service.js';
import { utilService } from '../../../services/util.service.js';
import { eventBus } from '../../../services/eventBus.service.js';

export default {
    props: ['noteId'],
    template: /*html*/ `
    <div class="flex column a-center ">
    <div class="flex a-center j-center">
        <div v-if="!noteId">
            <span>Title</span>
            <input class="search-bar" type="text" placeholder="add title" v-model="title">
        </div>
        &nbsp;
        <div>
            <span>Content</span>
            <input class="search-bar" type="text" :placeholder="typePlaceHolder" v-model="rawContent">
        </div>
        &nbsp;
        <button class="note-btn save-btn" @click="validateContent">save</button>
    </div>
        <div class="flex">
            <button class="note-btn" @click="type='text'"><img class="side-bar" src="images/keep-img/txt.png"></button>
            <button class="note-btn" @click="type='image'"><img class="side-bar" src="images/keep-img/img.png"></button>
            <button class="note-btn" @click="type='video'"><img class="side-bar" src="images/keep-img/video.png"></button>
            <button class="note-btn" @click="type='list'"><img class="side-bar" src="images/keep-img/todos.png"></button>
        </div>
    </div>`,
    data() {
        return {
            title: '',
            rawContent: '',
            type: 'text',
            note: {},
        };
    },
    methods: {
        validateContent() {
            if (!this.rawContent || this.rawContent === '') {
                this.emitToast('Please add note content', 'error');
                return;
            }
            if (!this.noteId) {
                if (!this.title || this.title === '') {
                    this.emitToast('Please add note title', 'error');
                    return;
                }
            }

            if (!this.type) {
                this.emitToast('Please select a type', 'error');
                return;
            }

            var { type, title, rawContent } = this;
            var url = rawContent;
            switch (type) {
                case 'text':
                    //add a note with a text
                    this.note = keepService.makeNote({
                        type,
                        mainTitle: title,
                        info: { txt: rawContent },
                    });
                    this.createNewNote();
                    break;
                case 'image':
                    utilService
                        .testImage(url)
                        .then((res) => {
                            this.note = keepService.makeNote({
                                type,
                                mainTitle: title,
                                info: { title, url: rawContent },
                            });
                            this.createNewNote();
                        })
                        .catch((err) => {
                            console.log('err:', err);
                            this.emitToast(
                                'The Url address target is not a valid image',
                                'error',
                            );
                            // this.note = {};
                        });

                    return;

                case 'video':
                    const isValidYTUrl = utilService.matchYoutubeUrl(url);
                    if (!isValidYTUrl || !url.includes('embed')) {
                        this.emitToast(
                            `url:${url} not a valid youtube embed url`,
                            'error',
                        );
                        return;
                    }
                    this.note = keepService.makeNote({
                        type,
                        mainTitle: title,
                        info: { url: this.rawContent },
                    });
                    this.createNewNote();
                    break;
                case 'list':
                    if (!rawContent.includes(',')) {
                        this.emitToast(
                            `must include commas for a list`,
                            'error',
                        );
                        return;
                    }
                    if (
                        rawContent.charAt(0) === ',' ||
                        rawContent.charAt(rawContent.length - 1) === ','
                    ) {
                        this.emitToast(
                            `remove commas from beginning and/or end`,
                            'error',
                        );
                        return;
                    }
                    this.note = keepService.makeNote({
                        type: type,
                        mainTitle: title,
                        info: {
                            todos: rawContent
                                .split(',')
                                .map((todoTxt) =>
                                    keepService.makeTodo(todoTxt),
                                ),
                        },
                    });
                    this.createNewNote();
                    break;
            }

            // console.log('newNote:', this.note);
        },
        emitToast(txt, type = success) {
            eventBus.$emit('show-msg', { txt, type });
        },
        emitAddedNote() {
            this.$emit('refreshNoteList', true);
            this.resetNote();
        },
        createNewNote() {
            const noteClone = JSON.parse(JSON.stringify(this.note));
            this.note = {};
            //when this component inside a note
            if (this.noteId) {
                const { type, info } = noteClone.content[0];
                const segment = keepService.makeNoteSegment(type, info);
                this.$emit('noteSectionMade', segment);
                return;
            }
            keepService
                .saveNote(noteClone)
                .then((note) => {
                    this.emitToast('note added!', 'success');
                    this.emitAddedNote();
                    this.resetNote();
                })
                .catch((err) => this.emitToast(JSON.stringify(err), 'error'));
        },
        resetNote() {
            this.title = '';
            this.rawContent = '';
            this.type = 'text';
            this.note = {};
        },
    },
    watch: {
        type() {
            this.rawContent = '';
        },
    },
    computed: {
        typePlaceHolder() {
            switch (this.type) {
                case 'text':
                    return 'Add some text';
                case 'image':
                    return 'Add an image link';
                case 'video':
                    return 'Add an youtube link';
                case 'list':
                    return 'insert todo,todo,todo';
            }
        },
    },
};
