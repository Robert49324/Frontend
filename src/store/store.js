
import Vuex from 'vuex'


const store = new Vuex.Store({
    state: {
        isAuth : false,
        role : "",
    },
    getters : {
        getIsAuth(state) {
            return state.isAuth
        },
        getRole(state) {
            return state.Role
        }
    },
    mutations: {
        SET_IS_AUTH(state, isAuth) {
            state.isAuth = isAuth
        },
        SET_ROLE(state, role) {
            state.Role = role
        },
    },
    actions :{
        
    }
})

export default store
