import Vue from 'vue';
import router from './src/router/index';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
import EnterPage from './src/module/enterPage/enterPage'
import './src/assets/css/mui.css'
import 'lib-flexible'

Vue.use(MintUI);
new Vue({
  el: "#main",
  components: {
    EnterPage
  },
  router,
  template: "<EnterPage></EnterPage>"
});