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
        chosen_email:'',
        current_user_object: {}
    },
    actions: {
        getAccount: ({commit, state}, payload) => {
            return client.database.getAccounts([payload.account]).then(acc => {
                let name = !acc[0] ? payload.account : ''
                commit('setChosenAccName', { name })
                return acc[0]
            })
            .catch(err => { return err })
        },
        authenticate: async ({commit, state }, payload) => {
           let { provider } = payload
           return vueAuth.authenticate(provider)
                         .then(response => { commit('setCurrentUserObject', { object: response.data.user }); return response })
                         .catch(err => { return err.response ? err.response : err })
        },
        requestMail: ({ commit, state }, payload) => {
            return axios.post(`${process.env.API_PATH}/auth/email/request`, { user_id: state.current_user_object._id, email: payload.email })
                        .then(response => { return response })
                        .catch(err => { return err.response ? err.response : err })
        },
        confirmMail: ({ commit, state}, payload) => {
            return axios.post(`${process.env.API_PATH}/auth/email/confirm`, { token: payload.token })
                        .then(response => { return response })
                        .catch(err => { return err.response ? err.response : err })
        },
        requestPhone: ({ commit, state }, payload) => {
            return axios.post(`${process.env.API_PATH}/auth/phone/request`, { user_id: state.current_user_object._id, country_code: payload.country_code, phone_number: payload.phone_number })
                        .then(response => { return response })
                        .catch(err => { console.log(err); return err.response ? err.response : err })
        },
        confirmPhone: ({ commit, state }, payload) => {
            return axios.post(`${process.env.API_PATH}/auth/phone/confirm`, { user_id: state.current_user_object._id, code: payload.code })
                        .then(response => { return response })
                        .catch(err => { console.log(err);return err.response ? err.response : err })
        }
    },
    mutations: {
        setCurrentUserObject: (state, { object }) => { Vue.set(state, 'current_user_object', object) },
        setChosenAccName: (state, { name }) => { Vue.set(state, 'chosen_account_name', name) },
        setChosenEmail: (state, { email }) => { Vue.set(state, 'chosen_email', email) }
    },
    getters: {
        currentUserObject: state => { return state.current_user_object },
        isAuthenticated: state => { return vueAuth.isAuthenticated() },
        chosenAccountName: state => { return state.chosen_account_name },
        verificationRequired: state => { return state.verification_required }
    }
})

export default store