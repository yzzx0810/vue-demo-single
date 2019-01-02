<template>
    <div>
        <header>
            <button @click="goAway"></button>
        </header>
        <article>
            <router-view></router-view>
        </article>
    </div>

</template>

<script>
    const enterPage = {
        methods: {
            goAway(){
                this.$router.push({name: 'homePage'});
            }
        }
    };

    export default enterPage
</script>

<style scoped>

</style>