<template>
  <div class="Box__container">
    <div class="Box__inner">
      <div class="Code">
        <loadingbar class="loadingbar"/>
        <h1>Code confirmation</h1>
        <p>To activate your account, enter the code received to your phone.</p>
        <div style="margin-bottom:10px;"  class="Code__Input">
          <img src="./../../../assets/ic_phone.svg"><input class="Input__utopian" style="margin-right:10px;" placeholder="Confirmation code" v-model="input_code">
        </div>
        <p style="margin-bottom:10px;">Didn't get the SMS? <button :disabled="clicked_resend" style="margin-left:10px;" class="Btn__light" @click="resendCode()">Resend</button></p>
        <p style="margin-bottom:10px;">Wrong number? <a class="clickable_link" @click="changeNumber()">Change Number</a></p>
        <div>
          <button class="Btn__blue" :disabled="input_code.length < 4  || input_code.length > 4 || clicked_continue" @click="submitCode()">CONTINUE</button>
        </div>
        <div style="height:24px;width:100%;"><p class="text__error" v-show="this.input_error">{{ input_error }}</p></div>
      </div>
    </div>
  </div>
</template>

<script>
import loadingbar from './../../partials/loading_bars/loading_bar_3_3.vue'
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
      clicked_resend: false,
      clicked_continue: false,
      input_code: '',
      input_error: ''
    }
  },
  methods: {
    changeNumber() {
      this.$store.commit('setPhoneNumber', { country_code: '', phone_number: '' })
      this.$store.dispatch('resetPendingPhone').then(response => {
        if(response.status === 200) {
          this.$router.push('/verify_phone')
        } else {
          this.$notify({ group: 'main', text: response.data.message, type:'error' })
        }
      })
    },
      resendCode() {

        this.$store.dispatch('checkCookie', { cookie_name: 's_s', timeout: 60 * 10 })
        .then(result => {
          if(result) {
            this.clicked_resend = true
            this.$store.dispatch('resendPhone')
            .then(response => {
              if(response.status !== 200) {
                this.$notify({ group: 'main', text: response.data.message, type:'error' })
              } else {
                this.$store.dispatch('changeCookie', { cookie_name: 's_s', timeout: 60 * 10 })
              }
              this.clicked_resend = false
            })
          } else {
             this.$notify({ group: 'main', text: 'You have tried too many times - please wait 10 Minutes', type:'error' })
             this.clicked_resend = false
          }
        })
      },
      submitCode() {
        this.$store.dispatch('checkCookie', { cookie_name: 's_t', timeout: 60 })
        .then(result => {
          if(result) {
            this.$store.dispatch('confirmPhone', { code: this.input_code })
            .then(response => {
              if(response.status === 200) {
                this.$store.dispatch('changeCookie', { cookie_name: 's_t', timeout: 60 })
                this.$router.push('/pick_account')
              } else {
                this.$notify({ group: 'main', text: response.data.message, type:'error' })
              }
            })
          } else {
             this.$notify({ group: 'main', text: 'You have tried too many times - please wait 1 Minute', type:'error' })
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

.Code {
    height: 282px;
}

.Code h1 {
    text-align: left;

}

.Code p {
    text-align: left;

}

.Code__Input {
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

.Code__Input img {
  padding: 13.5px 15px;
  border-left:1px solid #E0E2E5;
  border-top: 1px solid #E0E2E5;
  border-bottom: 1px solid #E0E2E5;
}

</style>
