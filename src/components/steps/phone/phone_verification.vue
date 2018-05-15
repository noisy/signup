<template>
  <div class="Box__container">
    <div class="Box__inner">
      <div class="PhoneVerif">
        <loadingbar class="loadingbar"/>
        <h1>Almost there</h1>
        <p>Please enter your phone number to activate your account using an SMS text code.</p>
        <div style="margin-bottom:2px;"  class="Code__Input">
          <img src="./../../../assets/ic_earth.svg"><input class="Input__utopian" style="margin-right:10px; border: 1px solid #000000;" placeholder="Country-Code" v-model="input_country_code">
        </div>
        <a style="text-decoration:none;color:#4786FF;font-size:14px;text-align:left;" target="_blank" href="https://countrycode.org/">Country-Code List</a>
        <div style="margin-top:8px;margin-bottom:10px;"  class="PhoneVerif__Input">
          <img src="./../../../assets/ic_phone.svg"><input class="Input__utopian" style="margin-right:10px;" placeholder="Phone number" v-model="input_phone_number">
        </div>
        <p class="PhoneVerif__Input-text">Example: 123456789</p>
        <p class="PhoneVerif__Input-text">* Land lines cannot receive SMS messages</p>
        <p class="PhoneVerif__Input-text">* Message and data rates may apply</p>
        <div>
          <button style="margin-top:20px;" class="Btn__blue" :disabled="input_country_code.length < 2 || input_phone_number.length < 7" @click="sendPhone()">CONTINUE</button>
        </div>
        <div style="height:24px;width:100%;"><p class="text__error" v-show="this.input_error">{{input_error}}</p></div>
      </div>
    </div>
  </div>
</template>

<script>
import loadingbar from './../../partials/loading_bars/loading_bar_2_3.vue'
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
      input_country_code: '',
      input_phone_number: '',
      input_error: ''
    }
  },
  methods: {
    sendPhone() {
      this.$store.commit('setPhoneNumber', { country_code: this.input_country_code, phone_number: this.input_phone_number })
      this.$store.dispatch('checkCookie', { cookie_name: 's_s', timeout: 60 * 10 })
      .then(result => {
        if(result) {
          this.$store.dispatch('requestPhone')
          .then(response => {
            console.log(response)
            if(response.status === 200) {
              console.log('push')
              this.$store.dispatch('changeCookie', { cookie_name: 's_s', timeout: 60 * 10 })
              this.$router.push('/confirm_phone')
            } else { this.$notify({ group: 'main', text: response.data.message, type:'error' }) }
          })
        } else {
          this.$notify({ group: 'main', text: 'You have tried too many times - please wait 10 Minutes', type:'error' })
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

.PhoneVerif {
    height: 360px;
}

.PhoneVerif h1 {
    text-align: left;

}

.PhoneVerif p {
    text-align: left;

}

.PhoneVerif__Input, .Code__Input {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.PhoneVerif__Input-text {
	color: #B7BCC0 !important;
	font-family: "Noto Sans" !important;
	font-size: 12px !important;
	line-height: 16px !important;
  margin:0 0 2px 0 !important;
}

.SaveKey__footer {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position:relative;
}

.PhoneVerif__Input img {
  padding: 13.5px 15px;
  border-left:1px solid #E0E2E5;
  border-top: 1px solid #E0E2E5;
  border-bottom: 1px solid #E0E2E5;
}

.Code__Input img {
  padding: 13.5px 15px;
  border-left:1px solid #000000;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
}

</style>
