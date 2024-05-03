/*import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})*/
import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist';
import {getAPI} from '../api'

const vuexLocal = new VuexPersist({
  key: 'super-calculator', // Choose a unique key to store your Vuex state in the storage.
  storage: window.localStorage, // Specify the storage system. In this case, localStorage.
  reducer: (state) => ({
    // Specify the parts of the state you want to persist.
    refreshToken: state.refreshToken,
    accessToken: state.accessToken,
    user_id: state.user_id,
  }),
});

const initialState = {
  refreshToken: null,
  accessToken: null,
  user_id: null,
}

const store = createStore({
    state: initialState,
    mutations: {
        updateStorage (state, {access, refresh, user_id}) {
            state.accessToken = access
            state.refreshToken = refresh
            state.user_id = user_id
        },
        destroyToken (state) {
            state.accessToken = null
            state.refreshToken = null
        }
    },
    getters: {
        authorized (state) {
            return state.accessToken != null
        }
    },
    actions: {
        userLogin (context, usercredentials) {
            return new Promise((resolve, reject) => {
                getAPI.post('/api/signin/', {
                    email: usercredentials.email,
                    password: usercredentials.password,
                }).then(response => {
                    console.log(response.data)
                    context.commit('updateStorage',{ access: response.data.tokens.access, refresh: response.data.tokens.refresh, user_id: response.data.id})
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        userLogout (context) {
            if (context.getters.authorized) {
                context.commit('destroyToken')
            } 
        }
    },
    plugins: [vuexLocal.plugin],
})

export default store
