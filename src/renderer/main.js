import Vue from 'vue'
import axios from 'axios'
import VueClipboard from 'vue-clipboard2';

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import db from '../datastore'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$axios = axios
Vue.prototype.$db = db

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueClipboard);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
