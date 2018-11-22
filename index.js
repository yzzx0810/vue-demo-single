import Vue from 'vue';
import login from './src/module/login/login.vue'

new Vue({
  el: "#main",
  components: {
    login
  },
  template: "<login></login>"
});