export default {
    template: /*html*/ `
    
    
    <div class="btn-list over-pad">
            <button class="left-btn first-btn" @click="$router.push('mail/compose')"><img class="side-bar" src="images/add.png"/>Compose</button>
            <button class="left-btn" @click="filterBy = 'inbox'"><img class="side-bar" src="images/inbox.jpg"/>Inbox</button>
            <button class="left-btn" @click="filterBy = 'favorites'"><img class="side-bar" src="images/star.jpg"/>Marked</button>
            <button class="left-btn" @click="filterBy = 'trash'"><img class="side-bar" src="images/trash.jpg"/>Trash</button>
        </div>
        `,
    data() {
        return { filterBy: null };
    },
    watch: {
        filterBy() {
            console.log(this.filterBy);
            this.emitFilter();
        },
    },
    methods: {
        emitFilter() {
            console.log(this.filterBy);
            this.$emit('filterSelected', this.filterBy);
        },
    },
    components: {},
};
