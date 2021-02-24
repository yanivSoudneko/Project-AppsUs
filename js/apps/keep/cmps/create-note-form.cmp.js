export default {
    template: /*html*/ `
    <div>
        <input class="search-bar" type="text" placeholder="Search..." v-model="searchStr">
    </div>`,
    data() {
        return { searchStr: '' };
    },
    methods: {},
};
