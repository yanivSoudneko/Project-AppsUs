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
            // console.log(this.searchStr);
            this.$emit('emitedSearchTerm', this.searchStr);
        },
    },
};
