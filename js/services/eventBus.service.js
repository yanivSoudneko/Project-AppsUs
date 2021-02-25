export const eventBus = new Vue({
    data() {
        return { windowWidth: null };
    },
    methods: {
        handleResize(ev) {
            this.windowWidth = ev.target.innerWidth;
        },
    },
    watch: {
        windowWidth() {
            this.$emit('resizedWidth', this.windowWidth);
        },
    },
    created() {
        window.addEventListener('resize', this.handleResize);
    },
});
