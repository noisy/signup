<template>
  <div class="Box__container">
    <v-dialog class="dialog_accept"/>
      <div class="Box__inner">
        <div class="EmailVerif">
          <loadingbar class="loadingbar"/>
          <h1>Email Verification</h1>
          <p>We need to know if your email match your social login to validate your account.</p>
          <div style="margin-bottom:10px;"  class="EmailVerif__Input">
            <img src="./../../../assets/ic_email.svg"><input class="Input__utopian" style="margin-right:10px;" placeholder="Enter your email" v-model="input_email"></input>
          </div>
          <div>
            <button class="Btn__blue" :disabled="!input_email || input_email.length < 5 || send_email" @click="show()">CONTINUE</button>
          </div>
          <div style="height:24px;width:100%;"><p class="text__error" v-show="this.input_error">{{input_error}}</p></div>
        </div>
      </div>
      <Login/>
  </div>
</template>

<script>
import loadingbar from './../../partials/loading_bars/loading_bar_1_3.vue'
import { mapGetters } from 'vuex'
import Login from './../../partials/login.vue'
export default {
  computed: {
    ...mapGetters([
      'chosenAccountName'
    ])
  },
  components: {
    loadingbar,
    Login
  },
  data() {
    return {
      send_email: false,
      input_email: '',
      input_error: ''
    }
  },
  methods: {
    show() {
      if(this.$store.state.current_user_object.privacy.accepted) return this.verify_mail()
      this.$modal.show('dialog', {
        title: 'Privacy Acceptance',
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc',
        buttons: [{ title: 'Accept', handler: () => {
              this.$store.dispatch('acceptModal', { type: 'privacy' })
              .then(response => {
                if(response.status === 200) { this.verify_mail() }
                else { this.$notify({ group: 'main', text: response.data.message, type:'error' }) }
              })
            }
          },{ title: 'Decline' }]
        })
      },
      verify_mail() {
        this.$store.dispatch('checkCookie', { cookie_name: 'e_t', timeout: 180 })
        .then(result => {
          if(result) {
            this.send_email = true
            this.$store.commit('setChosenEmail', { email: this.input_email })
            this.$store.dispatch('requestMail', { email: this.input_email })
            .then(response => {
              if(response.status === 200) {
                this.$store.dispatch('changeCookie', { cookie_name: 'e_t', timeout: 180 })
                this.$router.push('/email/success')
              } else { this.$notify({ group: 'main', text: response.data.message, type:'error' }) }
              this.send_email = false
            })
          } else { this.send_email = false; this.$notify({ group: 'main', text: 'You have tried too many times - please wait 3 Minutes', type:'error' }) }
        })
      }
  }
}
</script>

<style>

.vue-dialog{
  overflow-y: auto !important;
  max-height: 700px !important;
}

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
