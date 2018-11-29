import Vue from 'vue';
import login from './src/module/login/login.vue'
import './src/assets/css/mui.css'

new Vue({
  el: "#main",
  components: {
    login
  },
  template: "<login></login>"
});