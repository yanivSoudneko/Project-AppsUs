export default {
    template: /*html*/ `
        <div class="filter-list">
        <select @change="emitFilter" v-model="filterBy" class="filter-select">
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
            <option value="favorites">Favorites</option>
        </select>
            <input name="search" @input="emitSearchStr" v-model="searchStr">
        </div>`,
    data() {
        return {
            filterBy: 'all',
            searchStr: '',
        };
    },
    methods: {
        emitFilter() {
            console.log(this.filterBy);
            this.$emit('filterSelected', this.filterBy);
        },
        emitSearchStr() {
            console.log(this.searchStr);
            if (this.searchStr === '') return;
            this.$emit('inputSearchStr', this.searchStr);
        },
    },
};
