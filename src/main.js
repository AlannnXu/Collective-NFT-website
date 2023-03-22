import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
// Vue.prototype.$bus=new vue();import Vue from 'vue'
// import App from './App'
// import router from './router'
// import { store } from './store/'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//  el: '#app',
//  router,
//  store,
//  components: { App },
//  template: '<App/>'
// })