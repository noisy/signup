import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import Notifications from 'vue-notification'
import VueModal from 'vue-js-modal'

import axios from 'axios';  
import { onSuccess, onError, beforeRequestSuccess, beforeRequestError } from './interceptors/loader';

axios.interceptors.request.use(beforeRequestSuccess, beforeRequestError);  
axios.interceptors.response.use(onSuccess, onError);

Vue.use(VueModal, { dialog: true })
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
