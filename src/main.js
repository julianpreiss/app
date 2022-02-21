import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(vueAxios, axios)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

