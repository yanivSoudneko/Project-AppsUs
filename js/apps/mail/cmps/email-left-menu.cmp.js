export default {
    template: /*html*/ `
    
    
    <div class="btn-list over-pad">
            <button><i class="fas fa-plus-circle"></i>Compose</button>
            <button>Inbox</button>
            <button>Marked</button>
            <button>Trash</button>
        </div>
        `,
    data() {
        return { filterBy: null };
    },
    methods: {
        emitFilter() {
            console.log(this.filterBy);
            this.$emit('filterSelected', this.filterBy);
        },
    },
    components: {},
};
