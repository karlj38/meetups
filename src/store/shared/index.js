export default {
  actions: {
    clearError({ commit }) {
      commit("clearError");
    }
  },
  getters: {
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    }
  },
  mutations: {
    clearError(state) {
      state.error = null;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  state: {
    error: null,
    loading: false
  },
};