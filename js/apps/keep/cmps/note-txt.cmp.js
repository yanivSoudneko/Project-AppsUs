export default {
    template: /*html*/ `
        <div>
            <h5>{{content.info.txt}}</h5>
            <p>{{parsedDate}}</p>
        </div>`,
    props: ['content'],
    data() {
        return {};
    },
    methods: {},
    computed: {
        parsedDate() {
            return new Date(this.content.createdAt).toDateString();
        },
    },
};
