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
        },
    },
    {
        type: 'image',
        info: {
            url: 'https://previews.123rf.com/images/liubomirt/liubomirt1105/liubomirt110500053/9591780-crazy-rock-star-with-skull-and-deflated-toy-guitar-burning-his-tongue-with-hot-electric-compact-heat.jpg',
            title: 'Me playing Mi',
        },
    },
    {
        type: 'video',
        info: {
            url: 'http://some-img/me',
            title: 'Me playing Mi',
        },
    },
    {
        type: 'image',
        info: {
            url: 'http://some-img/me',
            title: 'Me playing Mi',
        },
    },
    {
        type: 'list',
        info: {
            label: 'How was it:',
            todos: [
                { txt: 'Do that', doneAt: null },
                { txt: 'Do this', doneAt: null },
            ],
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
    var newNote = {};
    const {
        type,
        title,
        info: { url, txt, todos },
    } = noteData;
    switch (noteData.type) {
        case 'text':
            newNote = { type, info: { txt } };
            break;
        case 'image':
        case 'video':
            newNote = { type, title, info: { url } };
            break;
        case 'list':
            newNote = { type, title, info: { todos } };
            break;
    }
    newNote.id = utilService.makeId();
    newNote.createdAt = Date.now();
    return newNote;
}

function _makeDefaultNotes(notesData) {
    return notesData.map((note) => makeNote(note));
}
