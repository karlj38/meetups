import meetup from "./meetup";
import shared from "./shared";
import user from "./user";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    meetup: meetup,
    shared: shared,
    user: user,
  }
});