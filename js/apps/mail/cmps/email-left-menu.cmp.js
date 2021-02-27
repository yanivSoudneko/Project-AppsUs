import { eventBus } from '../../../services/eventBus.service.js';
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
        return {
            filterBy: null,
            windowWidth: null,
        };
    },
    watch: {
        filterBy() {
            this.emitFilter();
        },
    },
    computed: {
        reactForResize() {},
        compose() {
            if (!this.windowWidth) return 'Compose';
            return this.windowWidth < 860 ? '' : 'Compose';
        },
        inbox() {
            if (!this.windowWidth) return 'Inbox';
            return this.windowWidth < 860 ? '' : 'Inbox';
        },
        favorties() {
            if (!this.windowWidth) return 'Favorties';
            return this.windowWidth < 860 ? '' : 'Favorties';
        },
        trash() {
            if (!this.windowWidth) return 'Trash';
            return this.windowWidth < 860 ? '' : 'Trash';
        },
    },
    methods: {
        emitFilter() {
            this.$emit('filterSelected', this.filterBy);
        },
        reactToResize(ev) {
            this.windowWidth = ev.target.innerWidth;
        },
    },
    components: {},
    created() {
        window.addEventListener('resize', this.reactToResize);
    },
    destroyed() {
        window.removeEventListener('resize', this.reactToResize);
    },
};
