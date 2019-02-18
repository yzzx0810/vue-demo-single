import Vue from 'vue';
import router from './src/router/index';
import EnterPage from './src/module/enterPage/enterPage'
import 'lib-flexible'
import './src/assets/css/base.css'

new Vue({
  el: "#root",
  components: {
    EnterPage
  },
  router,
  template: "<EnterPage></EnterPage>"
});