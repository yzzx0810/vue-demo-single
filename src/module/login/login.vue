<template>
  <div class="home">
    <button @click="buttonTest">Test</button>
    131231345379797086786
  </div>
</template>

<script>
  //  import mui from "@/src/assets/js/mui.js"
  import { Indicator } from 'mint-ui';

  const login = {
    components:{
      Indicator
    },
    methods: {
      buttonTest: () => {
        let a = "fadfasf";
        window.alert(a);
        Indicator.open('加载中...');
        setTimeout(function () {
          Indicator.close();
        }, 2000);
      }
    }
  };

  export default login;
</script>

<style lang="scss" scoped>
  @import "../../scss/login/login";
</style>
<style lang="css" scoped>
  @import "../../css/login/login.css";
</style>