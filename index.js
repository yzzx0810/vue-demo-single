import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
import login from './src/module/login/login.vue'
import './src/assets/css/mui.css'
import 'lib-flexible'

Vue.use(MintUI);
new Vue({
  el: "#main",
  components: {
    login
  },
  template: "<login></login>"
});