<template>
    <div class="main">
        <header>
            <div class="row1">支持我的全新奥迪色</div>
            <div class="row2">投票</div>
        </header>
        <article>
            <div class="content">
                奥迪二零一七年秋冬系列，快来这里寻找属于你的迪奥色奥迪二零一七秋冬系列，快来这里寻找属于你的迪奥色快来这里寻找属于你迪奥来这里寻找属于你的迪奥色？
            </div>
        </article>
        <footer>
            <div class="part_1" v-if="footerShow === 1">
                <div class="item" @click.stop="changeFooter(1)">支持浪漫主义</div>
                <div class="item" @click.stop="changeFooter(2)">支持酷感主义</div>
            </div>
            <div class="part_2" v-if="footerShow === 2">
                <div class="left">
                    <div class="progress">
                        <div class="bar" v-if="type === 1"></div>
                    </div>
                    <div :class="{'title': type !== 1}">支持浪漫主义 30%</div>
                </div>
                <div class="right">
                    <div class="progress">
                        <div class="bar" v-if="type === 2"></div>
                    </div>
                    <div :class="{'title': type !== 2}">支持酷感主义 70%</div>
                </div>
            </div>
        </footer>
    </div>

</template>

<script>
    const enterPage = {
        data() {
            return {
                footerShow: 1,
                type: 0
            }
        },
        methods: {
            changeFooter(id) {
                this.footerShow = 2;
                this.type = id;
                console.log(this.type);
            }
        }
    };

    export default enterPage
</script>

<style lang="scss" scoped>
    @import "../../scss/enterPage/enterPage.scss";
</style>