<template>
  <div class="Box__container">
      <div class="Box__inner">
        <div class="Success">
          <h1 style="padding-bottom:5px;">Email Confirmation</h1>
          <p>You’re now only a few steps away from having your own Utopian Account.</p>
          <p>Open the Email we've send you and click on the confirmation-link.</p>
          <div style="height:24px;width:100%;"><p class="text__error" v-show="this.input_error">{{input_error}}</p></div>
          <a style="cursor:pointer" @click="resendMail()">Resend Email</a>
        </div>
      </div>
  </div>
</template>

<script>
import loadingbar from './../partials/loading_bars/loading_bar_2_3.vue'
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
      input_error: ''
    }
  },
  methods: {
      resendMail() {
          this.$store.dispatch('requestMail', { email: this.$store.state.chosen_email })
          .catch(response => {
            this.$notify({ group: 'main', text: response.response.data.message, type:'error' })
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
