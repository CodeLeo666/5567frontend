import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import router from './router'
import axios from 'axios'
import qs from 'qs'
import global_ from './components/Global'

Vue.prototype.GLOBAL = global_

Vue.prototype.$axios = axios
Vue.prototype.qs = qs

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  components: { App },
  router,
  template: '<App/>'
})
