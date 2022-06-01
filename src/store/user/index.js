
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  child,
  get,
  getDatabase,
  push,
  ref,
  remove
} from "firebase/database";

export default {
  actions: {
    autoLogIn({ commit }, payload) {
      commit("setUser", { id: payload.uid, regKeys: {}, registeredMeetups: [] });
    },
    fetchUserData({ commit, getters }) {
      commit("setLoading", true);
      const user = {...getters.user};

      const db = getDatabase();
      const userRef = ref(db, `users/${user.id}/`);
      const userRegsRef = child(userRef, "registrations/");

      get(userRegsRef, "value").then(ref => {
        const data = ref.val();
        let registeredMeetups = [];
        let regKeys = {};

        for (const key in data) {
          registeredMeetups.push(data[key]);
          regKeys[data[key]] = key;
        }

        user.registeredMeetups = registeredMeetups;
        user.regKeys = regKeys;
        commit("setUser", user);
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        commit("setLoading", false);
      })
    },
    logout({ commit }) {
      const auth = getAuth();

      signOut(auth).then(() => {
        commit("setUser", null);
      }).catch((err) => {
        console.log(err)
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
          regKeys: {},
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
    registerUserForMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;

      const db = getDatabase();
      const userRef = ref(db, `users/${user.id}/`);
      const userRegRef = child(userRef, "registrations/");
      push(userRegRef, payload)
      .then((data) => {
        commit("registerUserForMeetup", { id: payload, regKey: data.key });
      })
      .catch(err => {
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
          regKeys: {},
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
    },
    unregisterUserForMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      if (!user.regKeys) return;

      const regKey = user.regKeys[payload];
      const db = getDatabase();
      const userRef = ref(db, `users/${user.id}/`);
      const userRegsRef = child(userRef, "registrations/");
      const userRegRef = child(userRegsRef, regKey);
      remove(userRegRef)
      .then(() => {
        commit("unregisterUserForMeetup")
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        commit("setLoading", false);
      });
    },
  },
  getters: {
    user (state) {
      return state.user;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    registerUserForMeetup(state, payload) {
      const meetupId = payload.id;
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === meetupId) >= 0) {
        return
      }
      state.user.registeredMeetups.push(meetupId);
      state.user.regKeys[meetupId] = payload.regKey;
    },
    unregisterUserForMeetup(state, payload) {
      const meetups = state.user.registeredMeetups;
      const index = meetups.findIndex(meetup => meetup.id === payload);
      meetups.splice(index, 1);
      delete state.user.regKeys[payload];
    }
  },
  state: {
    user: null,
  }
};