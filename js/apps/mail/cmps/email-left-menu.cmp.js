export default {
    template: /*html*/ `
    
    
    <div class="btn-list over-pad">
            <button><img class="side-bar" src="images/add.png"/></img>Compose</button>
            <button><img class="side-bar" src="images/inbox.jpg"/>Inbox</button>
            <button><img class="side-bar" src="images/star.jpg"/>Marked</button>
            <button><img class="side-bar" src="images/trash.jpg"/>Trash</button>
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