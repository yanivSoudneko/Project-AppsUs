export default {
    template: /*html*/ `
    <div>
        <img class="note-image" :src="content.info.url"  alt="content.title"/>
    </div>`,
    props: ['content'],
    data() {
        return {};
    },
    methods: {},
};
