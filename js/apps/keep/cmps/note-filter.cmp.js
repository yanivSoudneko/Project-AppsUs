export default {
    template: /*html*/ `
    <div>
        <input type="text" @input="setFilter" v-model="searchStr"/>
    </div>`,
    data() {
        return { searchStr: null, byName: '' };
    },
    methods: {
        setFilter() {
            console.log(this.filterBy);
            this.$emit('filtered', this.filterBy)
        }
    },
};