import Vue from "vue";
import Vuex from "vuex";
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
  ref as dbRef,
  update
} from "firebase/database";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

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
    updateMeetup(state, payload) {
      let meetup = state.meetups.find(meetup => {
        return meetup.id === payload.id;
      });

      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
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
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId:getters.user.id
      };
      const meetupListRef = dbRef(db, "meetups");
      let imgUrl = "";
      let key = "";
      let fileRef = "";

      push(meetupListRef, meetup)
      .then(data => {
        key = data.key;
        const filename = payload.img.name;
        const ext = filename.slice(filename.lastIndexOf("."));
        const storage = getStorage();
        fileRef = storageRef(storage, `meetups/${key}${ext}`);
        return uploadBytes(fileRef, payload.img);
      })
      .then(async () => {
        imgUrl = await getDownloadURL(fileRef);
        return update(child(meetupListRef, key), { imgUrl: imgUrl });
      })
      .then(key => {
        commit("createMeetup", {
          ...meetup,
          id: key,
          imgUrl: imgUrl
        });
      })
      .catch(err => {
        console.log(err);
      });
    },
    loadMeetups({ commit }) {
      commit("setLoading", true);
      const db = getDatabase();
      const meetupListRef = dbRef(db, "meetups");

      get(meetupListRef)
      .then(data => {
        const meetups = [];
        const obj = data.val();

        for (const key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            location: obj[key].location,
            imgUrl: obj[key].imgUrl,
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
    updateMeetup({ commit }, payload) {
      const db = getDatabase();
      commit("setLoading", true);
      const updateObj = {};

      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }

      update(dbRef(db, "meetups/" + payload.id), updateObj)
      .then(() => {
        commit("updateMeetup", payload);
      }).catch(err => {
        console.log(err);
      }).finally(() => {
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