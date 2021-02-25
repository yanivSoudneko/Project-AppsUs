export default {
    template: /*html*/ `
    <div class="flex a-center j-content">
        <span> Search:</span>
        <input type="text" @input="setFilter" v-model="searchStr"/>
    </div>`,
    data() {
        return { searchStr: null, byName: '' };
    },
    methods: {
        setFilter() {
            console.log(this.filterBy);
            this.$emit('filtered', this.filterBy);
        },
    },
};