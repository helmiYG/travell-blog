import Vue from 'vue'
import App from './App.vue'
import router from './router'
import wysiwyg from 'vue-wysiwyg'
Vue.use(wysiwyg, {})
Vue.use(require('vue-moment'))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
