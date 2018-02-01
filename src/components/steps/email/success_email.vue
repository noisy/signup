<template>
  <div class="Box__container">
    <div class="Box__inner">
      <div class="Success">
        <h1 style="padding-bottom:5px;">Email Confirmation</h1>
        <p>You’re now only a few steps away from having your own Utopian Account.</p>
        <p>Open the Email we've send you and click on the confirmation-link.</p>
        <div style="height:24px;width:100%;"><p class="text__error" v-show="this.input_error">{{input_error}}</p></div>
        <button :disabled="clicked_resend" class="Btn__blue" style="cursor:pointer" @click="resendMail()">Resend Email</button>
      </div>
    </div>
  </div>
</template>

<script>
import loadingbar from './../../partials/loading_bars/loading_bar_2_3.vue'
import crypto from 'crypto'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'chosenAccountName'
    ])
  },
  components: {
    loadingbar
  },
  data() {
    return {
      clicked_resend: false,
      input_error: ''
    }
  },
  methods: {
      resendMail() {
        this.clicked_resend = true
        this.$store.dispatch('checkCookie', { cookie_name: 'e_t', timeout: 180 })
          .then(result => {
            if(result) {
              this.$store.dispatch('requestMail', { email: this.$store.state.chosen_email })
              .then(response => {
                if(response.status === 200) {
                  this.$store.dispatch('changeCookie', { cookie_name: 'e_t', timeout: 180, error_text:  'You have send too many emails - please wait 3 minutes' })
                  this.$notify({ group: 'main', text: response.data, type:'success' })
                } else { this.$notify({ group: 'main', text: response.data, type:'error' }) }
                this.clicked_resend = false
              })
              .catch(response => { this.$notify({ group: 'main', text: response.data, type:'error' }) })
            } else { this.clicked_resend = false; this.$notify({ group: 'main', text: 'You have tried too many times - please wait 3 Minutes', type:'error' }) }
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

.Success {
  height:160px;
}


</style>
