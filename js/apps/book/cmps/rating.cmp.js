export default {
    template: /*html*/ `<star-rating :increment="0.5" :show-rating="true"  :read-only="false"  @rating-selected="setRating"></star-rating>`,
    methods: {
        setRating(rating) {
            this.$emit('rating-set', rating);
        },
    },
    components: {
        starRating: VueStarRating.default,
    },
};