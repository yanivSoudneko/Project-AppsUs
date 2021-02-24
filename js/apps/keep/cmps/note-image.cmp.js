export default {
    template: /*html*/ `
    <div>{{note}}
        <img :src="note.info.url"  alt="note.title"/>
    </div>`,
    props: ['note'],
    data() {
        return {};
    },
    methods: {},
};
