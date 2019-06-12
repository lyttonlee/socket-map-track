import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSocketIo from 'vue-socket.io'

Vue.use(new VueSocketIo({
  debug: true,
  // 这里的地址就是后端地址
  connection: '192.168.1.202:3000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
  // options: { path: "/my-app/" }
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
