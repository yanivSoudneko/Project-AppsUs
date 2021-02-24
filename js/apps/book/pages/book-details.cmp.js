import LongText from '../cmps/long-text.cmp.js';
import { bookService } from '../services/book-services.js';
import { eventBus } from '../../../services/eventBus.service.js';
import ReviewAdd from '../cmps/review-add.cmp.js';
export default {
    // props: ['book'],
    template: `
    <section v-if="book" class="book-details">
        <button class="close-modal" @click="closeDetails">X</button>
        <div class="modal-container">
        <div class="about-book">
            <h1>{{book.title}}</h1>
            <p>book ID: {{book.id}}</p>
            <p>book title: {{book.title}}</p>
            <p>book subtitle: {{book.subtitle}}</p>
            <p>book authors: {{book.authors}}</p>
            <p>book publishedDate: {{publishedDate}}</p>
            <long-text :description="book.description"/>
            <review-add />
            <div class="reviews-list">
            <p>book reviews:{{book.reviews}}</p>
            </div>
            <p>book length: {{book.pageCount}}</p>
            <p>book categories: {{book.categories}}</p>
            <p>book language: {{book.language}}</p>
            <p>text:{{bookLength}} </p>
            <p v-bind:class="{isOnSale:book.listPrice.isOnSale}">book onSale: {{book.listPrice.isOnSale}}</p>
        </div>
            <div class="card-image">
                <p><img :src="book.thumbnail"></p>
        </div>
        </div>
    </section>`,
    data() {
        return {
            book: null,
            bookToEdit: null,
        };
    },
    methods: {
        closeDetails() {
            this.$router.push('/book');
        },
    },
    computed: {
        save() {
            bookService
                .save(this.bookToEdit)
                .then((book) => {
                    const msg = {
                        txt: 'Book saved succesfully',
                        type: 'success',
                    };
                    eventBus.$emit('show-msg', msg);
                    this.$router.push('/book');
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
        bookLength() {
            if (this.book.pageCount > 500) {
                return 'long reading';
            } else if (this.book.pageCount > 200) {
                return 'decent reading';
            } else if (this.book.pageCount < 100) {
                return 'light reading';
            }
        },
        publishedDate() {
            if (this.book.publishedDate > 10) {
                return 'Veteran Book';
            } else if (this.book.publishedDate < 1) {
                return 'New!';
            }
        },
    },
    components: {
        LongText,
        ReviewAdd,
    },
    mounted() {
        const { bookId } = this.$route.params;
        console.log(
            '🚀 ~ file: book-details.cmp.js ~ line 88 ~ mounted ~ this.$route.params',
            this.$route.params,
        );
        bookService.getById(bookId).then((book) => {
            this.book = book;
        });
        console.log('book id:', bookId);
    },
};
