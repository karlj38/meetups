import Vue from "vue";
import Vuex from "vuex";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  get,
  getDatabase,
  push,
  ref,
} from "firebase/database";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    meetups: [
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createMeetup(state, payload) {
      state.meetups.push(payload);
    },
    setMeetups(state, payload) {
      state.meetups = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    autoLogIn({ commit }, payload) {
      commit("setUser", {id: payload.uid, registeredMeetups: [] });
    },
    logout({ commit }) {
      const auth = getAuth();

      signOut(auth).then(() => {
        commit("setUser", null);
      }).catch((err) => {
        console.log(err)
      });
    },
    clearError({ commit }) {
      commit("clearError");
    },
    createMeetup({ commit, getters }, payload) {
      const db = getDatabase();
      const meetup = {
        title: payload.title,
        location: payload.location,
        img: payload.img,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId:getters.user.id
      };
      const meetupListRef = ref(db, "meetups");

      push(meetupListRef, meetup)
      .then(data => {
        const key = data.key;
        commit("createMeetup", { id: key, ...meetup });
      })
      .catch(err => {
        console.log(err);
      });
    },
    loadMeetups({ commit }) {
      commit("setLoading", true);
      const db = getDatabase();
      const meetupListRef = ref(db, "meetups");

      get(meetupListRef)
      .then(data => {
        const meetups = [];
        const obj = data.val();

        for (const key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            location: obj[key].location,
            img: obj[key].img,
            description: obj[key].description,
            date: obj[key].date,
            creatorId: obj[key].creatorId
          })
        }

        commit("setMeetups", meetups);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        commit("setLoading", false);
      });
    },
    logUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      const auth = getAuth();

      signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then(data => {
        const user = {
          id: data.user.uid,
          registeredMeetups: []
        };

        commit("setUser", user);
      })
      .catch(err => {
        commit("setError", err);
        console.log(err);
      })
      .finally(() => {
        commit("setLoading", false);
      });
    },
    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then(data => {
        const newUser = {
          id: data.user.uid,
          registeredMeetups: []
        };

        commit("setUser", newUser);
      })
      .catch(err => {
        commit("setError", err);
        console.log(err);
      })
      .finally(() => {
        commit("setLoading", false);
      });
    }
  },
  getters: {
    error(state) {
      return state.error;
    },
    featuredMeetups (state, getters) {
      return getters.meetups.slice(0, 5);
    },
    loading(state) {
      return state.loading;
    },
    meetups (state) {
      return state.meetups.sort((a, b) => {
        return a.date > b.date;
      });
    },
    meetup (state) {
      return (id) => {
        return state.meetups.find(meetup => {
          return meetup.id === id;
        });
      }
    },
    user (state) {
      return state.user;
    }
  }
});