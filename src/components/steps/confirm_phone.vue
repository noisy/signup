<template>
<div class="Box__container">
      <div class="Box__inner">
        <div class="Code">
          <loadingbar class="loadingbar"/>
          <h1>Code confirmation</h1>
          <p>Thank you for providing your number (351930323234). To continue please enter the SMS code we’ve sent you.</p>
          <div style="margin-bottom:10px;"  class="Code__Input">
            <img src="./../../assets/ic_phone.svg"><input class="Input__utopian" style="margin-right:10px;" placeholder="Confirmation code" v-model="input_code"></input>
          </div>
          <p style="margin-bottom:10px;">Didn't receive the certification code? <a @click="resendCode()">Resend</a></p>
          <div>
            <button class="Btn__blue" :disabled="input_code.length < 4" @click="submitCode()">CONTINUE</button>
          </div>
          <div style="height:24px;width:100%;"><p class="text__error" v-show="this.input_error">{{input_error}}</p></div>
        </div>
      </div>
  </div>
</template>

<script>
import loadingbar from './../partials/loading_bars/loading_bar_3_3.vue'
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
      input_code: '',
      input_error: ''
    }
  },
  methods: {
      resendCode() {

      },
      submitCode() {
          this.$router.push('/success/phone')
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
    height: 272px;
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
