export default {
    template: `
  <div class="main-container">
  <header><h1>Keep App</h1></header>
  
  <datalist :id="listId">
  <option v:for="opt in info.txt" :value="txt" />
  </datalist>
  <label>
  {{info.txt}}
      <input placeholder="Enter text" type="text"/>
      </label>

      <button>save</button>
      <ul class="add-option flex">
          <li><img class="keep-icon clean-list" src="images/keep-img/txt.png"/></li>
          <li><img class="keep-icon clean-list" src="images/keep-img/img.png"/></li>
          <li><img class="keep-icon clean-list" src="images/keep-img/video.png"/></li>
          <li><img class="keep-icon clean-list" src="images/keep-img/gif.png"/></li>
          <li><img class="keep-icon clean-list" src="images/keep-img/todos.png"/></li>
</ul>
<hr />
  </div>`,
    props: ['info'],
    data() {
        return {
            val: "",
        }
    },
    methods: {
        returnVal() {
            this.$emit('setVal', this.val)
        }
    },
    computed: {
        listId() {
            return "list" + this._uid
        }
    }
}