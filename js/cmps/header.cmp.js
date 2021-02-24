export default {
    template: ` 
    <nav class="navbar bg-primary">
    <div class=" flex j-between a-center">
        <h3 class="logo" @click="$router.push('/')">AppSus.</h3>
        <div class="nav-bar-tabs clean-list flex">
            <router-link active-class="active-link" class="clean-anchor nav-link flex a-center j-center" to="/" exact>
                Home
            </router-link>
            <router-link to="/book" class="clean-anchor nav-link flex a-center j-center" exact>
                Books
            </router-link>
            <router-link to="/keep" class="clean-anchor nav-link flex a-center j-center" exact>
                Keep
            </router-link>
            <router-link to="/mail" class="clean-anchor nav-link flex a-center j-center" exact>
                Mail
            </router-link>
            <router-link to="/about" class="clean-anchor nav-link flex a-center j-center" exact>
                About
            </router-link>
        </div>
    </div>
</nav>`,
    data() {
        return {};
    },
    methods: {},
};