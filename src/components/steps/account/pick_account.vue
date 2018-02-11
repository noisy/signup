<template>
  <div class="Box__container">
    <v-dialog class="dialog_accept"/>
    <div class="Box__inner">
      <div class="PickAccount">
        <loadingbar class="loadingbar"/>
        <h1>Welcome to Utopian.io</h1>
        <p>Your account name is how you will be known on Utopian.io (Important: You are not able to change the name afterwards)</p>
        <div class="PickAccount__Input">
          <input class="Input__utopian" style="margin-right:10px;" placeholder="Enter your username" v-model="input_account"/>
          <button class="Btn__blue" :disabled="false" @click="show()">CONTINUE</button>
        </div>
        <div style="height:24px;width:100%;"><p class="text__error" v-show="this.input_error">{{input_error}}</p></div>
      </div>
    </div>
    <Login/>
  </div>
</template>

<script>
import loadingbar from './../../partials/loading_bars/loading_bar_start.vue'
import Login from './../../partials/login'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'chosenAccountName'
    ])
  },
  watch: {
    input_account: function() {
      this.validateAccountName()
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
    chooseAccount() {
    if(this.validationRules(this.input_account)) return
      this.$store.dispatch('createPassword')
        .then(this.$router.push('/save_key'))
    },
    show() {
      if(this.$store.state.current_user_object.tos) {
        if(this.$store.state.current_user_object.tos.accepted) return this.chooseAccount()
      }
      this.$modal.show('dialog', {
        title: 'Terms of Services',
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc',
        buttons: [{ title: 'Accept', handler: () => {
              this.$store.dispatch('acceptModal', { type: 'tos' })
              .then(response => {
                if(response.status === 200) { this.chooseAccount() }
                else { this.$notify({ group: 'main', text: response.data.message, type:'error' }) }})}},
                { title: 'Decline' }]})
      },
    validateAccountName() {
      let validation = this.validationRules(this.input_account)
      if(validation) {
        this.$store.commit('setChosenAccName', { name: '' })
        return  this.input_error = validation
      } else { this.input_error = '' }  

      this.$store.dispatch('getAccount', { account: this.input_account })
        .then(account => { this.input_error = account ? 'Account name not available' : '' })
        console.log(this.input_error)
        return this.input_error
    },
    validationRules(value) {
      let i, label, len, suffix;
      suffix = "Account name should "
      if (!value) return suffix + "not be empty."
      let length = value.length
      if (length < 3) return suffix + "be longer."
      if (length > 16) return suffix + "be shorter."
      if (/\./.test(value)) suffix = "Each account segment should "
      let ref = value.split(".");
      for (i = 0, len = ref.length; i < len; i++) {
        label = ref[i];
        if (!/^[a-z]/.test(label)) return suffix + "start with a letter."
        if (!/^[a-z0-9-]*$/.test(label)) return suffix + "have only letters, digits, or dashes."
        if (/--/.test(label)) return suffix + "have only one dash in a row."
        if (!/[a-z0-9]$/.test(label)) return suffix + "end with a letter or digit."
        if (!(label.length >= 3)) return suffix + "be longer"
      }
      return ''
    }
  }
}
</script>

<style>

.vue-dialog{
  overflow-y: auto !important;
  max-height: 700px !important;
}

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
