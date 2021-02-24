export default {
    template: `
<section class="book-filter">
    <form @submit.prevent="setFilter">
        <label> Search a book: </label>    
        <input type="text" list="select" placeholder="Search...." v-model="filterBy.byName">
        <label for="from"> From</label>
        <input type="number" name="from"  v-model.number="filterBy.from">
        <label for="to"> To</label>
        <input type="number" name="to" v-model.number="filterBy.to">
        <button>Filter</button>
        <router-link :to="'/book/add/'">Add</router-link>
    </form>
</section>
  `,
    data() {
        return {
            filterBy: {
                byName: '',
                from: 0,
                to: Infinity
            },
        }
    },
    methods: {
        setFilter() {
            console.log(this.filterBy);
            this.$emit('filtered', this.filterBy)
        }
    },
}