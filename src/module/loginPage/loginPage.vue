<template>
    <div class="home">
        <header>
            <button @click="buttonTest">Test</button>
            131231345379797086786
        </header>
        <router-view></router-view>
    </div>
</template>

<script>
    //  import mui from "@/src/assets/js/mui.js"
    import {Indicator} from 'mint-ui';

    const loginPage = {
        components: {
            Indicator
        },
        methods: {
            buttonTest() {
                this.$router.push({name: 'personalCenter'});
            }
        }
    };

    export default loginPage;
</script>

<style lang="scss" scoped>
    @import "../../scss/login/login";
</style>
<style lang="css" scoped>
    @import "../../css/login/login.css";
</style>