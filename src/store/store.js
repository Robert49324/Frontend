
import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        AccessToken : "",
        RefreshToken : "",
        Role : "",
    },
    getters : {
        getAccessToken(state) {
            return state.AccessToken
        },
        getRefreshToken(state) {
            return state.RefreshToken
        },
        getRole(state) {
            return state.Role
        }
    },
    mutations: {
        SET_ACCESS_TOKEN(state, token) {
            state.AccessToken = token
        },
        SET_REFRESH_TOKEN(state, token) {
            state.RefreshToken = token
        },
        SET_ROLE(state, role) {
            state.Role = role
        },
    },
    actions :{
        
    }
})

export default store
