export default {
    template: /*html*/ `
        <div>
            <iframe width="420" height="315"
                :src="content.info.url">
            </iframe>
        </div>`,
    props: ['content'],
    data() {
        return {};
    },
    methods: {},
};
