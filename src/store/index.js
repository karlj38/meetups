import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    meetups: [
      {
        date: "2022-05-09",
        desc: "bla bla bla",
        id: "123",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg",
        location: "loc",
        title: "NY"
      },
      {
        date: "2022-05-19",
        desc: "bla bla bla",
        id: "234",
        img: "https://images.unsplash.com/photo-1564594736624-def7a10ab047?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
        location: "loc",
        title: "Paris"
      }
    ],
    user: {
      id: "kj123",
      registeredMeetups: [
        "123"
      ]
    }
  },
  mutations: {
    createMeetup(state, payload) {
      state.meetups.push(payload);
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
    }
  }
});