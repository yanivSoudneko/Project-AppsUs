import keepAppPageCmp from '../pages/keep-app-page.cmp.js';
import { keepService } from '../services/keep.service.js';
import { utilService } from '../../../services/util.service.js';
import { eventBus } from '../../../services/eventBus.service.js';

export default {
    template: /*html*/ `
    <div class="flex column a-center">
    <div class="flex a-center">
        <div>
            <span>Title</span>
            <input class="search-bar" type="text" placeholder="add title" v-model="title">
        </div>
        &nbsp;
        <div>
            <span>Content</span>
            <input class="search-bar" type="text" :placeholder="typePlaceHolder" v-model="rawContent">
        </div>
        &nbsp;
        <button @click="validateContent">save</button>
    </div>
        <div class="flex">
            <button @click="type='text'">text</button>
            <button @click="type='image'">image</button>
            <button @click="type='video'">video</button>
            <button @click="type='list'">list</button>
        </div>
    </div>`,
    data() {
        return {
            title: 'Text Title DEV',
            rawContent:
                'http://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
            type: 'list',
            note: {},
        };
    },
    methods: {
        validateContent() {
            if (!this.rawContent || this.rawContent === '') {
                this.emitToast('Please add note content', 'error');
                return;
            }
            if (!this.title || this.title === '') {
                this.emitToast('Please add note title', 'error');
                return;
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

            console.log('newNote:', this.note);
        },
        emitToast(txt, type = success) {
            eventBus.$emit('show-msg', { txt, type });
        },
        emitAddedNote() {
            this.$emit('refreshNoteList', true);
        },
        createNewNote() {
            const noteClone = JSON.parse(JSON.stringify(this.note));
            this.note = {};
            keepService
                .saveNote(noteClone)
                .then((note) => {
                    this.emitToast('note added!', 'success');
                    this.emitAddedNote();
                })
                .catch((err) => this.emitToast(JSON.stringify(err), 'error'));
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
