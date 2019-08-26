import Vue from 'vue'
import Vuex from 'vuex'
// import { stat } from 'fs';

import sample from './modules/sample';
import user from './modules/user';
import dialog from './modules/dialog';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    sample: sample,
    user: user,
    dialog: dialog
  },
  state: {
    component: 'BaseTemplate',
    Authorization: '',
    loginDialog: false,
    
    messageDialog: false,
    messageDialogMessage: 'An error occured!',

    loadingDialog: false,
    loadingDialogMessage: ''

  },
  getters: {
    getBaseComponent: state => {
      return state.component;
    },
    isAuthenticated: state => {
      return (state.Authorization) ? true : false;
    },
    hasAuthorizationToken: state => {
      let Authorization = window.localStorage.getItem('Authorization');
      if (Authorization) {
        state.Authorization = Authorization;
        return true;
      } else {
        return false;
      }
    },
    getAuthorizationToken: state => {
      return state.Authorization;
    },
    getAuthorizationHeader: (state, getters) => {
      return (state.Authorization) ? { Authorization: getters.getAuthorizationToken} : {};
    }
  },
  mutations: {
    setBaseComponent (state, component) {
      state.component = component;
    },
    setAuthorizationToken (state, payload) {
      state.Authorization = payload.token_type + ' ' + payload.access_token;
      window.localStorage.setItem('Authorization', state.Authorization);
    },
    setAuthorization (state, payload) {
      state.Authorization = payload;
      // state.Authorization = payload + '..';
    },
    clearAuthorizationToken (state) {
      state.Authorization = '';
      window.localStorage.removeItem('Authorization');
    }
  },
  actions: {
    setAuthorizationToken ({commit}, payload) {
      commit('setAuthorizationToken', payload);
    },
    clearAuthorizationToken({commit}) {
      commit('clearAuthorizationToken');
    },
    setBaseComponent ({commit}, component) {
      commit('setBaseComponent', component);
    },
    initApp({dispatch}) {
      dispatch('initAuthorizationToken');
    },
    initAuthorizationToken({commit}) {
      let Authorization = window.localStorage.getItem('Authorization');
      if (Authorization) {
        commit('setAuthorization', Authorization);
      } else {
        return false;
      }
    },

  }
})
