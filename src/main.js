import Vue from 'vue'

import App from './App.vue'

Vue.config.productionTip = false

Vue.filter('appendCurrency', function (value) {
  if (!value) return ''
  value = `${value} EGP`
  return value
})

new Vue({
  render: h => h(App),
}).$mount('#app')
