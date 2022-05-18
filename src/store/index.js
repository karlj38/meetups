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
    user: null
  },
  mutations: {
    createMeetup(state, payload) {
      state.meetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
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
        console.log(err);
      });
    },
    signUserUp({ commit }, payload) {
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
        console.log(err);
      });
    }
  },
  getters: {
    featuredMeetups (state, getters) {
      return getters.meetups.slice(0, 5);
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