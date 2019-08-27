import {
    HTTP
} from '@/utilities/http-common';

export default {
    namespaced: true,
    state: {
        user: {}
    },
    getters: {},
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        getUser(state) {
            return state.user;
        }
    },
    actions: {
        setUser({
            commit
        }, user) {
            commit('setUser', user);
        },
        getUser() {
            return HTTP.get('/users/api/me/');
        }
    },
}