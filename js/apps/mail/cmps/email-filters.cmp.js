export default {
    template: /*html*/ `
        <div>
            <input list="filters" name="filter">
            <datalist id="filters">
                <option value="Edge">
                <option value="Firefox">
                <option value="Chrome">
                <option value="Opera">
                <option value="Safari">
            </datalist>
        </div>`,
    data() {
        return {
            filterBy: 'all',
        };
    },
    methods: {},
};
