import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import crypto from 'crypto'
import VueCookies from 'vue-cookies'

import loader from './modules/loader';

const steem = require('steem')
const dsteem = require('dsteem')
const client = new dsteem.Client('https://api.steemit.com')

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

var vueAuth = VueAuthenticate.factory(Vue.prototype.$http, {
  baseUrl: process.env.API_PATH,
  providers: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      redirectUri: `${process.env.ROOT_PATH}/auth/callback`,
      scope: ['read:user', 'user:email'],
      popupOptions: null,
    }
    /*facebook: { clientId: process.env.FACEBOOK_CLIENT_ID, redirectUri: `${process.env.ROOT_PATH}/auth/callback` },
    linkedin: { clientId: process.env.LINKEDIN_CLIENT_ID, redirectUri: `${process.env.ROOT_PATH}/auth/callback`  }*/
  }
})

const store = new Vuex.Store({
  state: {
    verification_required: true,
    isAuthenticated: false,
    chosen_account_name: '',
    chosen_email: '',
    generated_password: null,
    current_user_object: {},
    chosen_phonenumber: '',
    chosen_countrycode: '',
    loading: false,
  },
  actions: {
    checkCookie: ({
      commit,
      state
    }, payload) => {
      let tries = Number(window.$cookies.get(payload.cookie_name)) ? Number(window.$cookies.get(payload.cookie_name)) : 0
      if (tries >= 3) {
        return false
      }
      return true
    },
    changeCookie: ({
      commit,
      state
    }, payload) => {
      let tries = Number(window.$cookies.get(payload.cookie_name)) ? Number(window.$cookies.get(payload.cookie_name)) : 0
      window.$cookies.set(payload.cookie_name, tries += 1, payload.timeout)
    },
    createPassword: ({
      commit,
      state
    }, payload) => {
      let password = steem.formatter.createSuggestedPassword() // crypto.randomBytes(16).toString('hex')
      return commit('setGeneratedPassword', {
        password
      })
    },
    acceptModal: ({
      commit,
      state
    }, payload) => {
      return axios.post(`${process.env.API_PATH}/auth/account/accept`, {
          user_id: state.current_user_object._id,
          type: payload.type
        })
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err);
          return err.response ? err.response : err
        })
    },
    createAccount: async ({
      commit,
      state
    }, payload) => {
      const owner_key = dsteem.PrivateKey.fromLogin(state.chosen_account_name, state.generated_password, 'owner')
      const active_key = dsteem.PrivateKey.fromLogin(state.chosen_account_name, state.generated_password, 'active')
      const posting_key = dsteem.PrivateKey.fromLogin(state.chosen_account_name, state.generated_password, 'posting')
      const memo_key = dsteem.PrivateKey.fromLogin(state.chosen_account_name, state.generated_password, 'memo')
      const owner_auth = {
        weight_threshold: 1,
        account_auths: [],
        key_auths: [
          [owner_key.createPublic(), 1]
        ]
      }
      const active_auth = {
        weight_threshold: 1,
        account_auths: [],
        key_auths: [
          [active_key.createPublic(), 1]
        ]
      }
      const posting_auth = {
        weight_threshold: 1,
        account_auths: [],
        key_auths: [
          [posting_key.createPublic(), 1]
        ]
      }
      const memo_auth = {
        weight_threshold: 1,
        account_auths: [],
        key_auths: [
          [memo_key.createPublic(), 1]
        ]
      }
      return axios.post(`${process.env.API_PATH}/auth/account/create`, {
          user_id: state.current_user_object._id,
          account_name: state.chosen_account_name,
          owner_auth,
          active_auth,
          posting_auth,
          memo_auth,
          last_digits_password: state.generated_password.substring(state.generated_password.length - 5, state.generated_password.length)
        })
        .then(response => {
          return response
        })
        .catch(err => {
          return err.response ? err.response : err
        })
    },
    getAccount: async ({
      commit,
      state
    }, payload) => {
      return client.database.getAccounts([payload.account]).then(acc => {
          let name = !acc[0] ? payload.account : ''
          commit('setChosenAccName', {
            name
          })
          return acc[0]
        })
        .catch(err => {
          return err
        })
    },
    authenticate: async ({
      commit,
      state
    }, payload) => {
      let {
        provider
      } = payload
      return vueAuth.authenticate(provider)
        .then(response => {
          console.log('auth resp', response);
          commit('setCurrentUserObject', {
            object: response.data.user
          });
          return response
        })
        .catch(err => {
          return err.response ? err.response : err
        })
    },
    requestMail: ({
      commit,
      state
    }, payload) => {
      return axios.post(`${process.env.API_PATH}/auth/email/request`, {
          user_id: state.current_user_object._id,
          email: payload.email
        })
        .then(response => {
          return response
        })
        .catch(err => {
          return err.response ? err.response : err
        })
    },
    confirmMail: ({
      commit,
      state
    }, payload) => {
      return axios.post(`${process.env.API_PATH}/auth/email/confirm`, {
          token: payload.token
        })
        .then(response => {
          return response
        })
        .catch(err => {
          return err.response ? err.response : err
        })
    },
    confirmApproval: ({
      commit,
      state
    }, payload) => {
      return axios.post(`${process.env.API_PATH}/auth/approval/confirm`, {
          token: payload.token
        })
        .then(response => {
          return response
        })
        .catch(err => {
          return err.response ? err.response : err
        })
    },
    requestPhone: ({
      commit,
      state
    }, payload) => {
      return axios.post(`${process.env.API_PATH}/auth/phone/request`, {
          user_id: state.current_user_object._id,
          country_code: state.chosen_countrycode,
          phone_number: state.chosen_phonenumber
        })
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err);
          return err.response ? err.response : err
        })
    },
    confirmPhone: ({
      commit,
      state
    }, payload) => {
      return axios.post(`${process.env.API_PATH}/auth/phone/confirm`, {
          user_id: state.current_user_object._id,
          code: payload.code
        })
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err);
          return err.response ? err.response : err
        })
    },
    resendPhone: ({
      commit,
      state
    }, payload) => {
      return axios.post(`${process.env.API_PATH}/auth/phone/resend`, {
          user_id: state.current_user_object._id,
          country_code: state.chosen_countrycode,
          phone_number: state.chosen_phonenumber
        })
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err);
          return err.response ? err.response : err
        })
    },
    confirmInviteCode: ({
      commit,
      state
    }, payload) => {
      return axios.post(`${process.env.API_PATH}/auth/invite/confirm`, {
          user_id: state.current_user_object._id,
          code: state.invite_code
        })
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err);
          return err.response ? err.response : err
        })
    },
    resetPendingPhone: ({
      commit,
      state
    }, payload) => {
      return axios.post(`${process.env.API_PATH}/auth/phone/reset`, {
          user_id: state.current_user_object._id
        })
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err);
          return err.response ? err.response : err
        })
    },
    requestApproval: ({
      commit,
      state
    }, payload) => {
      return axios.post(`${process.env.API_PATH}/auth/approval/request`, {
          user_id: state.current_user_object._id
        })
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err);
          return err.response ? err.response : err
        })
    },
    createUserFromSteemAccount: ({
      commit,
      state
    }, payload) => {
      return axios.post(`${process.env.API_PATH}/users/create/steem`, {
          user_id: payload.user_id,
          access_token: payload.access_token,
          steem_account: payload.steem_account,
        })
        .then(response => {
          return response
        })
        .catch(err => {
          console.log(err);
          return err.response ? err.response : err
        })
    },
    login: ({
      commit,
      state
    }, payload) => {
      let url = "https://join.utopian.io"
      window.location.href = url
    },
    setLoading({
      commit
    }, status) {
      commit('setLoading', status);
    }
  },
  mutations: {
    setCurrentUserObject: (state, {
      object
    }) => {
      Vue.set(state, 'current_user_object', object)
    },
    setChosenAccName: (state, {
      name
    }) => {
      Vue.set(state, 'chosen_account_name', name)
    },
    setChosenEmail: (state, {
      email
    }) => {
      Vue.set(state, 'chosen_email', email)
    },
    setGeneratedPassword: (state, {
      password
    }) => {
      Vue.set(state, 'generated_password', password)
    },
    setPhoneNumber: (state, {
      country_code,
      phone_number
    }) => {
      Vue.set(state, 'chosen_countrycode', country_code);
      Vue.set(state, 'chosen_phonenumber', phone_number)
    },
    setInviteCode: (state, {
      invite_code
    }) => {
      Vue.set(state, 'invite_code', invite_code)
    },
    setLoading: (state, status) => {
      Vue.set(state, 'loading', status)
    },
  },
  getters: {
    currentUserObject: state => state.current_user_object,
    isAuthenticated: state => vueAuth.isAuthenticated(),
    chosenAccountName: state => state.chosen_account_name,
    verificationRequired: state => state.verification_required,
    generatedPassword: state => state.generated_password,
    isLoading: state => state.loading,
  },
  modules: {
    loader
  }
})

export default store
