import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

const store = new Vuex.Store({
  state: {
    isAuth: false,
    role: "",
    user: null,
  },
  getters: {
    getIsAuth(state) {
      return state.isAuth;
    },
    getRole(state) {
      return state.Role;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    SET_IS_AUTH(state, isAuth) {
      state.isAuth = isAuth;
    },
    SET_ROLE(state, role) {
      state.Role = role;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {},
  plugins: [
    createPersistedState()
  ]
});

export default store;

