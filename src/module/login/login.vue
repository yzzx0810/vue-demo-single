<template>
  <div class="home">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">MUI_Test</h1>
    </header>

  </div>
</template>

<script>
  import mui from "@/src/assets/js/mui.js"
  const login = {
    created(){
      mui.init();
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