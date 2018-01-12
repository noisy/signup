import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import Notifications from 'vue-notification'

Vue.use(Notifications)

Vue.config.productionTip = true
Vue.config.silent = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
