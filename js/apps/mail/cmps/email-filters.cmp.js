export default {
    template: /*html*/ `
        <div class="filter-list">
        <select @change="emitFilter" v-model="filterBy" class="filter-select">
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
            <option value="favorites">Favorites</option>
        </select>
            <input name="searchSubject" placeholder="Search in Subject" @input="emitSearchStr" v-model="searchSubjectStr">
            <input name="searchBody" placeholder="Search in body" @input="emitSearchStr" v-model="searchBodyStr">
        </div>`,
    data() {
        return {
            filterBy: 'all',
            searchSubjectStr: '',
            searchBodyStr: '',
        };
    },
    methods: {
        emitFilter() {
            this.$emit('filterSelected', this.filterBy);
        },
        emitSearchStr() {
            if (this.searchStr === '') return;
            this.$emit('inputSearchStr', {
                subject: this.searchSubjectStr,
                body: this.searchBodyStr,
            });
        },
    },
};