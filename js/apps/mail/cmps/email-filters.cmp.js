export default {
    template: /*html*/ `
        <div class="filter-list">
        <select class ="filter-select">
        <option value="All">All</option>
        <option value="Read">Read</option>
        <option value="Unread">Unread</option>
        <option value="Marked">Marked</option>
        <option value="Trash">Trash</option>
        </select>
            <input list="filters" name="filter">
        </div>`,
    data() {
        return {
            filterBy: 'all',
        };
    },
    methods: {},
};