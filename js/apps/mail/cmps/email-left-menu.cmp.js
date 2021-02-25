import { eventBus } from '../../../services/eventBus.service.js'
export default {
    template: /*html*/ `
    
    
    <div class="btn-list over-pad">
            <button class="left-btn first-btn" @click="$router.push('mail/compose')"><img class="side-bar" src="images/add.png"/>{{compose}}</button>
            <button class="left-btn" @click="filterBy = 'inbox'"><img class="side-bar" src="images/inbox.jpg"/>{{inbox}}</button>
            <button class="left-btn" @click="filterBy = 'favorites'"><img class="side-bar" src="images/star.jpg"/>{{favorties}}</button>
            <button class="left-btn" @click="filterBy = 'trash'"><img class="side-bar" src="images/trash.jpg"/>{{trash}}</button>
        </div>
        `,
    data() {
        return { filterBy: null, windowWidth: null };
    },
    watch: {
        filterBy() {
            console.log(this.filterBy);
            this.emitFilter();
        },
    },
    computed: {
        reactForResize() {

        },
        compose() {
            return this.windowWidth < 680 ? '' : 'Compose'
        },
        inbox() {
            return this.windowWidth < 680 ? '' : 'Inbox'
        },
        favorties() {
            return this.windowWidth < 680 ? '' : 'Favorties'
        },
        trash() {
            return this.windowWidth < 680 ? '' : 'Trash'
        },
    },
    methods: {
        emitFilter() {
            console.log(this.filterBy);
            this.$emit('filterSelected', this.filterBy);
        },
        reactToResize(width) {
            console.log('width', width)
        },
        myEventHandler(ev) {
            console.log('ev:', ev.target.innerWidth)
            this.windowWidth = ev.target.innerWidth
        }
    },
    components: {},
    created() {
        window.addEventListener("resize", this.myEventHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
    },
};