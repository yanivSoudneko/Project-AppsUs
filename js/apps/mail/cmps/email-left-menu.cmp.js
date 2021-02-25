export default {
    template: /*html*/ `
    
    
    <div class="btn-list over-pad">
            <button><img class="side-bar" src="images/add.png"/>Compose</button>
            <button @click="filterBy = 'inbox'"><img class="side-bar" src="images/inbox.jpg"/>Inbox</button>
            <button @click="filterBy = 'favorites'"><img class="side-bar" src="images/star.jpg"/>Marked</button>
            <button @click="filterBy = 'trash'"><img class="side-bar" src="images/trash.jpg"/>Trash</button>
        </div>
        `,
    data() {
        return { filterBy: null };
    },
    watch: {
        filterBy() {
            console.log(this.filterBy)
            this.emitFilter()
        }
    },
    methods: {
        emitFilter() {
            console.log(this.filterBy);
            this.$emit('filterSelected', this.filterBy);
        },
    },
    components: {},
};