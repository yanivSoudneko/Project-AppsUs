export default {
    template: `
    <div class="main-container">
        <header><h1>Keep App</h1></header>
        <section>
            <input placeholder="Enter text" type="text"/>
            <button>save</button>
            <ul class="add-option flex">
                <li><img class="keep-icon clean-list" src="images/keep-img/txt.png"/></li>
                <li><img class="keep-icon clean-list" src="images/keep-img/img.png"/></li>
                <li><img class="keep-icon clean-list" src="images/keep-img/video.png"/></li>
                <li><img class="keep-icon clean-list" src="images/keep-img/gif.png"/></li>
                <li><img class="keep-icon clean-list" src="images/keep-img/todos.png"/></li>
               
</ul>
<hr />
        </section>
       <section class="notes-container">
           <input class="search-bar" type="text" placeholder="Search..." value>
           <h2>Pinned</h2>
           <div class="pinned"></div>
           <div class="unpinned"></div>
       </section> 
</div>`,
    data() {
        return {};
    },
    methods: {},
};