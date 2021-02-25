export default {
    template: /*html*/ `
        <div>
            <iframe width="200" height="90"
                :src="content.info.url">
            </iframe>
        </div>`,
    props: ['content'],
    data() {
        return {};
    },
    methods: {},
};