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
    created() {
        console.log('TODO:', { id: this.content.id, info: this.content.info });
    },
};
