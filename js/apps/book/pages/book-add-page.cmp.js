import { bookApiService } from '../services/book-api.service.js';
import { bookService } from '../services/book-services.js';
import { eventBus } from '../../../services/eventBus.service.js';
export default {
    template: `
    <section>
      <input type="text" @input="queryApi" v-model="searchStr" placeholder="Search for book to add"/>
      <button>Search</button>

      <ul v-if="parsedBooks.length">
        <li v-for="(book,idx) in parsedBooks" :key>
          {{book.title}}
          <button @click="addBook(book)">+</button>
        </li>
      </ul>
</section>
  `,
    data() {
        return { parsedBooks: [], searchStr: '' };
    },
    methods: {
        addBook(book) {
            console.log(book);

            bookService
                .save(book)
                .then(() => {
                    const msg = {
                        txt: 'Book saved succesfully',
                        type: 'success',
                    };
                    eventBus.$emit('show-msg', msg);
                    bookService.query().then(() => {
                        this.$router.push('/book');
                    });
                })
                .catch((err) => {
                    console.log(err);
                    const msg = {
                        txt: 'Error,please try again',
                        type: 'error',
                    };
                    eventBus.$emit('show-msg', msg);
                });
        },
        queryApi() {
            if (this.searchStr.length <= 3) return;
            console.log(this.filterBy);
            bookApiService.search(this.searchStr).then((parsedBooks) => {
                this.parsedBooks = parsedBooks;
            });
        },
    },
    created() {
        console.log('Aviiii');
    },
};
