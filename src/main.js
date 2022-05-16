import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from "./store"
import DateFilter from "./filters/date";

Vue.config.productionTip = false

Vue.filter("date", DateFilter);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
