import Vue from 'vue'
import Vuex from 'vuex'

//import axios from 'axios'

const steem = require('steem')
const dsteem = require('dsteem')
const client = new dsteem.Client('https://api.steemit.com')

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        chosen_account_name:''
    },
    actions: {
        getAccount: ({commit, state}, payload) => {
            return client.database.getAccounts([payload.account]).then(acc => {
                let name = !acc[0] ? payload.account : ''
                commit('setChosenAccName', { name })
                return acc[0]
            })
        } 
    },
    mutations: {
        setChosenAccName: (state, { name }) => {
            Vue.set(state, 'chosen_account_name', name)
        }
    },
    getters: {
        chosenAccountName: state => {
            return state.chosen_account_name
        }
    }
})

export default store