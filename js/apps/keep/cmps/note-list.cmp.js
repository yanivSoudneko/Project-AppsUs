export default {
    template: /*html*/ `
    <ul class="clean-list">
        <li v-for="(todo,idx) in content.info.todos" :key="idx" class="flex a-center">
            <input type="checkbox" :name="content.id + '_' + idx" v-model="todo.isDone"/>
            &nbsp;
            <div class="todo-text">{{todo.txt}}</div>
        </li>
    </ul>`,
    props: ['content'],
    data() {
        return {};
    },
    methods: {},
    computed: {
        // noteToShow() {
        //     console.log('bookToShow');
        //     if (!this.filterBy) return this.content
        //     const searchStr = this.filterBy.byName.toLowerCase()
        //     const bookToShow = this.books.filter(book => {
        //         return book.title.toLowerCase().includes(searchStr) 
        //             
        //     })
        //     return bookToShow
        // }
    },
};