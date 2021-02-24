export default {
    props: ['description'],
    template: `
  <section class="book-description">
  <p>{{descToShow}}</p>
  <button v-if="isShowenDesc" @click="readMore">read more</button>
  </section>
  `,
    data() {
        return {
            isShowenDesc: this.description.length > 100,
            isShownAllDesc: false
        }
    },
    methods: {
        readMore() {
            this.isShownAllDesc = true
            this.isShowenDesc = false
        }
    },
    computed: {
        descToShow() {
            if (this.isShownAllDesc || !this.isShowenDesc) return this.description
            return this.description.substring(0, 100) + '...'
        }
    },


}