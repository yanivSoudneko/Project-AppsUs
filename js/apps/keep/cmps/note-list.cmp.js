export default {
    template: /*html*/ `
    <ul class="clean-list">
        <li v-for="(todo,idx) in content.info.todos" :key="idx" class="flex a-center">
            <input @change="updateTodo(idx)" type="checkbox" :name="content.id + '_' + idx" v-model="todo.isDone"/>
            &nbsp;
            <div class="todo-text">{{todo.txt}}</div>
        </li>
    </ul>`,
    props: ['content'],
    methods: {
        updateTodo(idx) {
            this.content.info.todos[idx].isDone = !this.content.info.todos[idx]
                .isDone;
            this.$emit('todoChecked', {
                idx,
                isDone: this.content.info.todos[idx].isDone,
            });
        },
    },
    data() {
        return {};
    },
};
