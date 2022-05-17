import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from "./store"
import DateFilter from "./filters/date";
import * as firebase from "firebase/app";

Vue.config.productionTip = false

Vue.filter("date", DateFilter);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBYuSaCWCSPoWHZAlzPFXVL07uah2goCgU",
      authDomain: "meetups-ad1cc.firebaseapp.com",
      projectId: "meetups-ad1cc",
      storageBucket: "meetups-ad1cc.appspot.com",
      messagingSenderId: "636331269258",
      appId: "1:636331269258:web:d5bd947a15393c2a6de173",
      measurementId: "G-055SB0SHEH"
    })
  }
}).$mount('#app')
