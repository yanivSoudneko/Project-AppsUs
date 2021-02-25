import keepAppPageCmp from '../pages/keep-app-page.cmp.js';
import { keepService } from '../services/keep.service.js';
import { utilService } from '../../../services/util.service.js';
import { eventBus } from '../../../services/eventBus.service.js';

export default {
    template: /*html*/ `
    <div class="flex column a-center">
    <div class="flex">
        <input class="search-bar" type="text" :placeholder="typePlaceHolder" v-model="rawContent">
        <input class="search-bar" type="text" placeholder="add title" v-model="title">
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
        return { title: null, rawContent: null, type: 'text' };
    },
    methods: {
        validateContent() {
            if (!this.rawContent || this.rawContent === '') {
                this.emitToast('Please add note content', 'error');
                return;
            }
            if (!this.type) {
                this.emitToast('Please select a type', 'error');
                return;
            }

            const newNote = {};

            switch (this.type) {
                case 'text':
                    //add a note with a text
                    newNote = keepService.makeNote({
                        type: this.type,
                        mainTitle: title,
                        info: { txt: this.rawContent },
                    });
                    break;
                case 'image':
                    utilService
                        .testImage(url)
                        .then((res) => {
                            newNote = keepService.makeNote({
                                type: this.type,
                                mainTitle: title,
                                info: { url: this.rawContent },
                            });
                            // TODO:save to storage
                            // keepService
                            //     .saveNote(newNote)
                            //     .then((note) => {
                            //         this.emitToast('note added!');
                            //     })
                            //     .catch((err) =>
                            //         this.emitToast(
                            //             JSON.stringify(err),
                            //             'error',
                            //         ),
                            //     );
                        })
                        .catch((err) => {
                            this.emitToast(JSON.stringify(err), 'error');
                        });

                    break;
                case 'video':
                    const isValidYTUrl = utilService.matchYoutubeUrl(url);
                    if (!isValidYTUrl) {
                        this.emitToast(
                            `url:${url} not a valid youtube url`,
                            'error',
                        );
                        // return;
                        newNote = keepService.makeNote({
                            type: this.type,
                            mainTitle: title,
                            info: { url: this.rawContent },
                        });
                    }
                    break;
                case 'list':
                    const { rawContent } = this;
                    if (!rawContent.includes(',')) {
                        this.emitToast(
                            `content:${rawContent} must include commas for a list`,
                            'error',
                        );
                        return;
                    }
                    newNote = keepService.makeNote({
                        type: this.type,
                        mainTitle: title,
                        info: { todos: this.rawContent.split(',') },
                    });
                    break;
            }

            console.log('newNote:', newNote);
            // keepService
            //     .saveNote(newNote)
            //     .then((note) => {
            //         this.emitToast('note added!');
            //     })
            //     .catch((err) => this.emitToast(JSON.stringify(err), 'error'));
        },
        emitToast(txt, type = success) {
            eventBus.$emit('show-msg', { txt, type });
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