import { bookService } from '../services/book-services.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import bookDetails from '../pages/book-details.cmp.js'
import bookHeader from '../cmps/app-header.cmp.js'


export default {
    template: `
      <section class="book-app">
        <book-filter @filtered="setFilter"/>
        <router-view></router-view>
        <book-list v-if="books" :books="bookToShow" @remove="removeBook" @selected="selectBook" />
        <book-details v-if="selectedBook" :book="selectedBook" @close="selectedBook = null" /> 
      </section>
  `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null,
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        loadBooks() {
            bookService.query()
                .then(books => this.books = books)
        },
        selectBook(book) {
            this.selectedBook = book
        },
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(this.loadBooks)
        },
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
    created() {
        this.loadBooks()
    },
    components: {
        bookFilter,
        bookList,
        bookDetails,
        bookHeader,
    },

}