<template>
  <div class="Box__container">
    <div class="Box__inner">
      <loadingbar class="loadingbar"/>
      <h1>Welcome to Utopian.io!</h1>
      <p>Please select the option to proceed with the account creation.</p>
      <div class="options">
        <button 
          class="Btn__blue" 
          @click="noAccount()">I DON'T HAVE A STEEM ACCOUNT</button>
        <button 
          class="Btn__blue" 
          @click="steemConnect()">CONNECT MY EXISTING STEEM ACCOUNT</button>
      </div>
    </div>
    <Login/>
  </div>
</template>

<script>
import loadingbar from "./../../partials/loading_bars/loading_bar_1_3.vue";
import * as SteemConnect from "sc2-sdk";
import { mapGetters } from "vuex";
export default {
  components: {
    loadingbar
  },
  computed: {
    ...mapGetters({ user: "currentUserObject" })
  },
  methods: {
    noAccount() {
      if (
        !this.user.social_verified &&
        !this.user.sms_verified &&
        !this.user.email_verified
      ) {
        this.$router.push("/verify_invite");
      } else if (
        (this.user.social_verified || this.user.sms_verified) &&
        this.user.email_verified
      ) {
        this.$router.push("/pick_account");
      } else if (!this.user.email_verified) {
        this.$router.push("/verify_mail");
      } else {
        this.$router.push("/verify_phone");
      }
    },
    steemConnect() {
      const sc2 = SteemConnect.Initialize({
        app: process.env.STEEM_CONNECT_ID,
        callbackURL: `${process.env.ROOT_PATH}/success_connect`,
        scope: ["login"]
      });
      location.href = sc2.getLoginURL(this.user._id);
    }
  }
};
</script>

<style>
.options {
  display: flex;
  flex-direction: column;
}

.Btn__blue {
  margin-top: 10px;
  width: 100%;
}

.Box__key {
  height: 55.44px;
  width: 336px;
  border-left: 1px solid #e0e2e5;
}

.loadingbar {
  margin-top: 12px !important;
  margin-bottom: 12px !important;
}
</style>
