import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const keepService = {
    query,
    makeNote,
};

const DB_NAME = 'notes_db';
var defaultNotes = [
    {
        type: 'text',
        info: {
            txt: 'Fullstack Me Baby!',
            title: 'Me text title',
        },
    },
    {
        type: 'image',
        info: {
            url:
                'https://previews.123rf.com/images/liubomirt/liubomirt1105/liubomirt110500053/9591780-crazy-rock-star-with-skull-and-deflated-toy-guitar-burning-his-tongue-with-hot-electric-compact-heat.jpg',
            title: 'Me image title',
        },
    },
    {
        type: 'video',
        info: {
            url: 'https://www.youtube.com/embed/tgbNymZ7vqY',
            title: 'Me video ttle',
        },
    },
    {
        type: 'image',
        info: {
            url:
                'https://previews.123rf.com/images/liubomirt/liubomirt1105/liubomirt110500053/9591780-crazy-rock-star-with-skull-and-deflated-toy-guitar-burning-his-tongue-with-hot-electric-compact-heat.jpg',
            title: 'Me image again title',
        },
    },
    {
        type: 'list',
        info: {
            label: 'How was it:',
            todos: [
                { txt: 'Do that', doneAt: null, isDone: false },
                { txt: 'Do this', doneAt: null, isDone: false },
            ],
            title: 'Me todo title',
        },
    },
];

//CRUD
function query(filter = null, bool) {
    return storageService.query(DB_NAME).then((notes) => {
        console.log('note:', notes[0]);
        if (!notes.length) {
            notes = _makeDefaultNotes(defaultNotes);
            storageService.postMany(DB_NAME, notes);
        }
        if (filter && notes[0].hasOwnProperty(filter)) {
            notes = notes.filter((note) => note[filter] === bool);
            console.log('note filtered:', note);
        }
        return notes;
    });
}

function makeNote(noteData) {
    var noteContent = {};
    const {
        type,
        info: { title, url, txt, todos },
    } = noteData;
    switch (noteData.type) {
        case 'text':
            noteContent = { type, info: { txt } };
            break;
        case 'image':
        case 'video':
            noteContent = { type, title, info: { url } };
            break;
        case 'list':
            noteContent = { type, title, info: { todos } };
            break;
    }
    noteContent.id = utilService.makeId();
    noteContent.createdAt = Date.now();
    return {
        id: utilService.makeId(),
        title,
        isPinned: false,
        content: [noteContent],
        createdAt: Date.now(),
    };
}

function _makeDefaultNotes(notesData) {
    return notesData.map((note) => makeNote(note));
}
