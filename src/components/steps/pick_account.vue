<template>
<div class="Box__container">
      <div class="Box__inner">
        <div class="PickAccount">
          <loadingbar class="loadingbar"/>
          <h1>Welcome to Utopian.io</h1>
          <p>Your account name is how you will be known on Utopian.io</p>
          <div class="PickAccount__Input">
            <input class="Input__utopian" style="margin-right:10px;" placeholder="Enter your username" v-model="input_account"></input>
            <button class="Btn__blue" :disabled="!chosenAccountName" @click="createAccount()">CONTINUE</button>
          </div>
          <div style="height:24px;widht:100%;"><p class="text__error" v-show="this.input_error">{{input_error}}</p></div>
        </div>
      </div>
      <Login/>
  </div>
</template>

<script>
import loadingbar from './../partials/loading_bars/loading_bar_start.vue'
import Login from './../partials/login'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'chosenAccountName'
    ])
  },
  watch: {
    input_account: function() {
      this.getAccount()
    },

  },
  components: {
    loadingbar
  },
  data() {
    return {
      input_account: '',
      input_error: ''
    }
  },
  methods: {
    createAccount() {
      // create account
      this.$router.push('/save_key')
    },
    getAccount() {
      if(this.input_account.length > 0 && this.input_account.length <= 2) {
         this.input_error = 'Account name should be longer.'
         this.$store.commit('setChosenAccName', { name: '' })
         return
      }
      if(this.input_account.length <= 0) {
        this.input_error = ''
        this.$store.commit('setChosenAccName', { name: '' })
        return
      } else {
        this.input_error = ''
      }

      this.$store.dispatch('getAccount', { account: this.input_account })
      .then(account => {
        this.input_error = account ? 'Account name not available' : ''
      })
      
      
    }
  }
}
</script>

<style>

.loadingbar {
  margin-top:12px !important;
  margin-bottom:12px !important;
}

.PickAccount {
    height: 212px;
}

.PickAccount h1 {
    text-align: left;
    
}

.PickAccount p {
    text-align: left;
    
}

.PickAccount__Input {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>
