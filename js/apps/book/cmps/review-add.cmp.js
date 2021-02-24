import starRating from './rating.cmp.js';

import { bookService } from '../services/book-services.js'
import { eventBus } from '../services/event-bus-service.js'

export default {

    template: `
  <form @submit.prevent="save">
    <h2>add review</h2>
    <input ref="nameInput" type="name" placeholder="Full Name" v-model="review.fullName">
    <br />
    <star-rating @rating-set="setRating"></star-rating>
    <input type="date" value="2021-02-22" >
    <br />
    <textarea v-model="review.txt"></textarea>
    <button>Save!</button>
  
  </form>
  `,
    data() {
        return {
            review: {
                fullName: 'Books Reader',
                rate: 1,
                txt: ''
            }
        }
    },
    methods: {
        save() {
            bookService.addReview(this.$route.params.bookId, this.review)
                .then(() => {
                    const msg = {
                        txt: 'Review added to book',
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg)
                })

        },
        setRating(rating) {
            console.log('rating:', rating);
            this.review.rate = rating;
        },
    },
    mounted() {
        this.$refs.nameInput.focus()
    },
    components: { starRating }

}