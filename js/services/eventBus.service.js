export const eventBus = new Vue({
    data() {
        return { windowWidth: null }
    },
    mounted() {
        document.body.addEventListener('resize', (e) => {
            this.windowWidth = ev.target.innerWidth
        })
    },
    watch: {
        windowWidth() {
            // this.windowWidth
            this.$emit('resizedWidth', this.windowWidth)
            console.log("🚀 ~ file: eventBus.service.js ~ line 15 ~ windowWidth ~ this.windowWidth", this.windowWidth)
        }
    }
});