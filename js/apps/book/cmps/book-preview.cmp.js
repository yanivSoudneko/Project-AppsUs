export default {
    props: ['book'],
    template: `
  <section class="book-preview">
      <p>Book Title: {{book.title}}</p>
      <p v-bind:class="isExpensive">Book Price: {{formattedPrice}}</p>
  </section>
  `,
    methods: {
        formatAsCurrency(value, currency) {
            return value.toLocaleString('en-US', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 2,
            });
        },
    },
    computed: {
        formattedPrice() {
            const { amount, currencyCode } = this.book.listPrice;
            return this.formatAsCurrency(amount, currencyCode);
        },
        isExpensive() {
            if (this.book.listPrice.amount > 150) {
                return 'expensive'
            } else {
                return 'cheap'
            }
        }
    },
}