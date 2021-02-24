import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
    <ul v-if="books.length" class="book-list">
        <li v-for="book in books" :key="book.id" class="book-preview-container" >
            <book-preview :book="book" @click.native="logId(book.id)" />
            <img :src="book.thumbnail" class="card-img">
            <div class="btns-container">
                <button @click="remove(book.id)">X</button>
                <router-link :to="'/book/details/'+book.id">Details</router-link>
            </div>
        </li>
    </ul>
    <h3 v-else>No books to show!</h3>
    `,
    methods: {
        remove(bookId) {
            console.log('bookId:', bookId)
            this.$emit('remove', bookId)
        },
        select(book) {
            this.$emit('selected', book)
        },
        logId(bookId) {
            console.log('Id is', bookId);
        }
    },
    computed: {
        bookToShow() {
            console.log('bookToShow');
            if (!this.filterBy) return this.books
            const searchStr = this.filterBy.byName.toLowerCase()
            const bookToShow = this.books.filter(book => {
                return book.title.toLowerCase().includes(searchStr) &&
                    book.listPrice.amount > this.filterBy.from &&
                    book.listPrice.amount < this.filterBy.to
            })
            return bookToShow
        }
    },
    components: {
        bookPreview
    }
}