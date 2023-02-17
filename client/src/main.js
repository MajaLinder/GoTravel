import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toasted from 'vue-toasted'

Vue.use(BootstrapVue)
Vue.use(Toasted)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

// options to the toast
const options = {
  type: 'dark',
  position: 'top-center',
  action: {
    text: 'Cancel',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  }
}

// register the toast with the custom message
Vue.toasted.register('my_app_error',
  (payload) => {
    // if there is no message passed show default message
    if (!payload.message) {
      return 'Oops.. Something Went Wrong..'
    }

    // if there is a message show it with the message
    return payload.message
  },
  options
)
