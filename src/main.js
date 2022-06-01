import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from "./store"
import DateFilter from "./filters/date";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppAlert from "./components/shared/Alert";
import EditMeetupDetailsDialog from "./components/Meetup/Edit/EditMeetupDetailsDialog";
import EditMeetupDateDialog from "./components/Meetup/Edit/EditMeetupDateDialog";
import EditMeetupTimeDialog from "./components/Meetup/Edit/EditMeetupTimeDialog";
import RegistrationDialog from "./components/Meetup/Registration/RegistrationDialog";

Vue.config.productionTip = false

Vue.filter("date", DateFilter);

Vue.component("app-alert", AppAlert);
Vue.component("app-edit-meetup-details-dialog", EditMeetupDetailsDialog);
Vue.component("app-edit-meetup-date-dialog", EditMeetupDateDialog);
Vue.component("app-edit-meetup-time-dialog", EditMeetupTimeDialog);
Vue.component("registration-dialog", RegistrationDialog);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    initializeApp({
      apiKey: "AIzaSyBYuSaCWCSPoWHZAlzPFXVL07uah2goCgU",
      authDomain: "meetups-ad1cc.firebaseapp.com",
      databaseURL: "https://meetups-ad1cc-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "meetups-ad1cc",
      storageBucket: "meetups-ad1cc.appspot.com",
      messagingSenderId: "636331269258",
      appId: "1:636331269258:web:d5bd947a15393c2a6de173",
      measurementId: "G-055SB0SHEH"
    });

    const auth = getAuth();

    onAuthStateChanged(auth, user => {
      if (user) {
        this.$store.dispatch("autoLogIn", user);
      }
    });

    this.$store.dispatch("loadMeetups");
  }
}).$mount('#app')
