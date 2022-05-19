import Vue from "vue";
import Vuex from "vuex";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    meetups: [
      {
        date: new Date(),
        desc: "bla bla bla",
        id: "123",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg",
        location: "loc",
        title: "NY"
      },
      {
        date: new Date(),
        desc: "bla bla bla",
        id: "234",
        img: "https://images.unsplash.com/photo-1564594736624-def7a10ab047?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
        location: "loc",
        title: "Paris"
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createMeetup(state, payload) {
      state.meetups.push(payload);
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
    clearError({ commit }) {
      commit("clearError");
    },
    createMeetup({ commit }, payload) {
      const meetup = {
        id: "test",
        title: payload.title,
        location: payload.location,
        img: payload.img,
        description: payload.description,
        date: payload.date
      };

      commit("createMeetup", meetup);
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