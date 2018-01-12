<template>
<div class="Box__container">
      <div class="Box__inner">
        <div class="EmailVerif">
          <loadingbar class="loadingbar"/>
          <h1>Email Verification</h1>
          <p>We need to know if your email match your social login to validate your account.</p>
          <div style="margin-bottom:10px;"  class="EmailVerif__Input">
            <img src="./../../assets/ic_email.svg"><input class="Input__utopian" style="margin-right:10px;" placeholder="Enter your email" v-model="input_email"></input>
          </div>
          <div>
            <button class="Btn__blue" :disabled="!input_email || input_email.length < 5" @click="verify_mail()">CONTINUE</button>
          </div>
          <div style="height:24px;width:100%;"><p class="text__error" v-show="this.input_error">{{input_error}}</p></div>
        </div>
      </div>
      <Login/>
  </div>
</template>

<script>
import loadingbar from './../partials/loading_bars/loading_bar_1_3.vue'
import { mapGetters } from 'vuex'
import Login from './../partials/login.vue'
export default {
  computed: {
    ...mapGetters([
      'chosenAccountName'
    ])
  },
  watch: {

  },
  components: {
    loadingbar,
    Login
  },
  data() {
    return {
      input_email: '',
      input_error: ''
    }
  },
  methods: {
      verify_mail() {
          this.$store.commit('setChosenEmail', { email: this.input_email })
          this.$store.dispatch('requestMail', { email: this.input_email })
          .then(response => {
            if(response.status === 200) {
              this.$router.push('/email/success')
            } else {
              this.$notify({ group: 'main', text: response.response.data.message, type:'error' })
            }
          })
      }
  }
}
</script>

<style>

.Box__key {
  height: 55.44px;
  width: 336px;
  border-left: 1px solid #E0E2E5;
}

.loadingbar {
  margin-top:12px !important;
  margin-bottom:12px !important;
}

.EmailVerif {
    height: 212px;
}

.EmailVerif h1 {
    text-align: left;
    
}

.EmailVerif p {
    text-align: left;
    
}

.EmailVerif__Input {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.SaveKey__footer {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position:relative;
}

.EmailVerif__Input img {
  padding: 15px 15px;
  border-left:1px solid #E0E2E5;
  border-top: 1px solid #E0E2E5;
  border-bottom: 1px solid #E0E2E5;
}

</style>
