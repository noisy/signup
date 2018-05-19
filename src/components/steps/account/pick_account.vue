<template>
  <div class="Box__container">
    <v-dialog class="dialog_accept"/>
    <div style="height:230px;" class="Box__inner">
      <div class="PickAccount">
        <loadingbar class="loadingbar"/>
        <h1>Welcome to Utopian.io</h1>
        <p style="margin-bottom:15px;">Choose an account name to use on Utopian. Note that you cannot change your account name after selection.</p>
        <div class="PickAccount__Input">
          <input class="Input__utopian" style="margin-right:10px;" placeholder="Enter your username" v-model="input_account"/>
          <button class="Btn__blue" :disabled="false" @click="chooseAccount()">CONTINUE</button>
        </div>
        <div class="Checkbox__container">
          <p style="margin:0" class="text__grey">Terms of Service: </p>
          <input v-model="accept_checked" class="Checkbox__utopian" type="checkbox">
          <a style="font-size:14px; margin-left:5px;" href="https://join.utopian.io/tos" target="_blank">Read</a>
        </div>
        <div v-show="this.input_error" style="height:24px;width:100%;"><p class="text__error" v-show="this.input_error">{{input_error}}</p></div>
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
    input_account: function(input) {
      console.log(input)
      this.input_account = input.toLowerCase().trim()
      this.validateAccountName()
    },
  },
  components: {
    loadingbar
  },
  data() {
    return {
      input_account: '',
      input_error: '',
      accept_checked: false
    }
  },
  methods: {
    chooseAccount() {
      if(this.validationRules(this.input_account)) return this.$notify({ group: 'main', text: `Invalid Name`, type:'error' })
      if(!this.accept_checked) return this.$notify({ group: 'main', text: `Please accept the TOS`, type:'error' })
      this.$store.dispatch('acceptModal', { type: 'tos' })
      .then(response => {
        if(response.status === 200) {
          this.$store.dispatch('createPassword')
          .then(this.$router.push('/save_key'))
        }
        else {
          this.$notify({ group: 'main', text: response.data.message, type:'error' })
        }
      })
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
.Checkbox__container {
  display:flex;
  align-items:center;
  padding-top:5px;
}

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
