import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios';

//import axios from 'axios'

const steem = require('steem')
const dsteem = require('dsteem')
const client = new dsteem.Client('https://api.steemit.com')

Vue.use(Vuex)
Vue.use(VueAxios, axios)

var vueAuth = VueAuthenticate.factory(Vue.prototype.$http, {
    baseUrl: process.env.API_PATH,
    providers: {
        github: { clientId: process.env.GITHUB_CLIENT_ID, redirectUri: `${process.env.ROOT_PATH}/auth/callback`, scope: ['read:user','user:email','public_repo','read:org'] },
        facebook: { clientId: process.env.FACEBOOK_CLIENT_ID, redirectUri: `${process.env.ROOT_PATH}/auth/callback` },
        linkedin: { clientId: process.env.LINKEDIN_CLIENT_ID, redirectUri: `${process.env.ROOT_PATH}/auth/callback`  }
      }
})

const store = new Vuex.Store({
    state: {
        verification_required: true,
        isAuthenticated: false,
        chosen_account_name:'',
        current_user_object: {}
    },
    actions: {
        getAccount: ({commit, state}, payload) => {
            return client.database.getAccounts([payload.account]).then(acc => {
                let name = !acc[0] ? payload.account : ''
                commit('setChosenAccName', { name })
                return acc[0]
            })
        },
        authenticate: async ({commit, state }, payload) => {
           let this_ = this
           let { provider } = payload
           return vueAuth.authenticate(provider)
            .then(function(response) {
                commit('setCurrentUserObject', { object: response.data.user })
                return response
            })
            .catch(function (err) {
              this_.response = err
              console.log(err)
            })
        },
        sendMail: ({ commit, state }, payload) => {

        }
    },
    mutations: {
        setCurrentUserObject: (state, { object }) => { Vue.set(state, 'current_user_object', object) },
        setChosenAccName: (state, { name }) => { Vue.set(state, 'chosen_account_name', name) }
    },
    getters: {
        currentUserObject: state => { return state.current_user_object },
        isAuthenticated: state => { return vueAuth.isAuthenticated() },
        chosenAccountName: state => { return state.chosen_account_name },
        verificationRequired: state => { return state.verification_required }
    }
})

export default store