// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/bootstrap.css'
import './assets/css/animate.min.css'
import './assets/js/jquery-3.2.1.min.js'
import './assets/js/bootstrap.min.js'
import './assets/css/style.css'

import VueResource from 'vue-resource'
Vue.use(VueResource);//支持VueResource这个插件

Vue.config.productionTip = false;

/* eslint-disable no-new */

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App },
  created:function(){
    console.log();
  }
})




