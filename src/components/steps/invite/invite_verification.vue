<template>
  <div class="Box__container">
    <div class="Box__inner">
      <loadingbar class="loadingbar"/>
      <h1>Almost there</h1>
      <p>Please enter an invitation code to activate your account.</p>
      <div 
        style="margin-bottom:2px;" 
        class="Code__Input">
        <img src="./../../../assets/ic_email.svg"><input 
          v-model="input_invite_code" 
          class="Input__utopian" 
          style="margin-right:10px; border: 1px solid #E0E2E5;" 
          placeholder="Invitation code">
      </div>
      <div>
        <button 
          style="margin-top:20px;" 
          class="Btn__blue" 
          @click="sendCode()">CONTINUE</button>
      </div>
      <div style="height:24px;width:100%;"><p 
        v-show="input_error" 
        class="text__error">{{ input_error }}</p></div>
      <p style="text-align: center;margin-bottom:10px;"><a 
        class="clickable_link" 
        @click="userWithoutCode()">Don't have an invitation code? </a></p>
    </div>
    <Login/>
  </div>
</template>

<script>
import Login from "./../../partials/login";
import loadingbar from "./../../partials/loading_bars/loading_bar_1_3.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    loadingbar,
    Login
  },
  data() {
    return {
      input_invite_code: "",
      input_error: ""
    };
  },
  methods: {
    sendCode() {
      this.$store
        .dispatch("checkCookie", { cookie_name: "s_s", timeout: 60 * 10 })
        .then(result => {
          if (result) {
            this.$store.commit("setInviteCode", {
              invite_code: this.input_invite_code
            });
            this.$store.dispatch("confirmInviteCode").then(response => {
              console.log(response);
              if (response.status === 200) {
                console.log("push");
                this.$store.dispatch("changeCookie", {
                  cookie_name: "s_s",
                  timeout: 60 * 10
                });
                this.$router.push("/verify_mail");
              } else {
                this.$notify({
                  group: "main",
                  text: response.data.message,
                  type: "error"
                });
              }
            });
          } else {
            this.$notify({
              group: "main",
              text: "You have tried too many times - please wait 10 Minutes",
              type: "error"
            });
          }
        });
    },
    userWithoutCode() {
      this.$router.push("/verify_mail");
    }
  }
};
</script>

<style>
.Box__key {
  height: 55.44px;
  width: 336px;
  border-left: 1px solid #e0e2e5;
}

.loadingbar {
  margin-top: 12px !important;
  margin-bottom: 12px !important;
}

.Code__Input {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.Code__Input img {
  padding: 15.2px 15px;
  border-left: 1px solid #e0e2e5;
  border-top: 1px solid #e0e2e5;
  border-bottom: 1px solid #e0e2e5;
}
</style>
