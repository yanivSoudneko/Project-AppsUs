export default {
    template: /*html*/ `
    <div class="flex a-center j-content">
        <span> Search:</span>
        <input type="text" @input="setFilter" v-model="searchStr"/>
    </div>`,
    data() {
        return { searchStr: '' };
    },
    methods: {
        setFilter() {
            this.$emit('emitedSearchTerm', this.searchStr);
        },
    },
};
