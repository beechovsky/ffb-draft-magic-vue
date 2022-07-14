// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import VuePapaParse from 'vue-papa-parse'

// turning this on gives you pretty buttons, etc., but breaks current grid configuration
// import 'bootstrap/dist/css/bootstrap.css'

Vue.use(BootstrapVue)
Vue.use(VuePapaParse)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
