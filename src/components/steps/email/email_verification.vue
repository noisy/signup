<template>
  <div class="Box__container">
    <v-dialog class="dialog_accept"/>
    <div 
      style="height:250px;" 
      class="Box__inner">
      <div class="EmailVerif">
        <loadingbar class="loadingbar"/>
        <h1>Email Verification</h1>
        <p>Please enter the email address to validate your account.</p>
        <div 
          style="margin-bottom:10px;" 
          class="EmailVerif__Input">
          <img src="./../../../assets/ic_email.svg"><input 
            v-model="input_email" 
            class="Input__utopian" 
            style="margin-right:10px;" 
            placeholder="Enter your email">
        </div>
        <div class="Checkbox__container">
          <p 
            style="margin:0" 
            class="text__grey">Privacy Agreement: </p>
          <input 
            v-model="accept_checked" 
            class="Checkbox__utopian" 
            type="checkbox">
          <a 
            style="font-size:14px; margin-left:5px;" 
            href="https://join.utopian.io/privacy" 
            target="_blank">Read</a>
        </div>
        <div style="margin-top:10px;">
          <button 
            :disabled="!input_email || input_email.length < 5 || send_email" 
            class="Btn__blue" 
            @click="check()">CONTINUE</button>
        </div>
      </div>
    </div>
    <Login/>
  </div>
</template>

<script>
import loadingbar from "./../../partials/loading_bars/loading_bar_1_3.vue";
import { mapGetters } from "vuex";
import Login from "./../../partials/login.vue";
export default {
  components: {
    loadingbar,
    Login
  },
  data() {
    return {
      send_email: false,
      input_email: "",
      input_error: "",
      accept_checked: false
    };
  },
  computed: {
    ...mapGetters(["chosenAccountName"])
  },
  methods: {
    check() {
      if (this.$store.state.current_user_object.privacy) {
        if (this.$store.state.current_user_object.privacy.accepted)
          return this.verify_mail();
      }
      if (!this.accept_checked)
        return this.$notify({
          group: "main",
          text: `Please accept the Privacy Agreement`,
          type: "error"
        });

      this.$store
        .dispatch("acceptModal", { type: "privacy" })
        .then(response => {
          if (response.status === 200) {
            this.verify_mail();
          } else {
            this.$notify({
              group: "main",
              text: response.data.message,
              type: "error"
            });
          }
        });
    },
    verify_mail() {
      this.$store
        .dispatch("checkCookie", { cookie_name: "e_t", timeout: 180 })
        .then(result => {
          if (result) {
            this.send_email = true;
            this.$store.commit("setChosenEmail", { email: this.input_email });
            this.$store
              .dispatch("requestMail", { email: this.input_email })
              .then(response => {
                if (response.status === 200) {
                  this.$store.dispatch("changeCookie", {
                    cookie_name: "e_t",
                    timeout: 180
                  });
                  this.$router.push("/email/success");
                } else {
                  this.$notify({
                    group: "main",
                    text: response.data.message,
                    type: "error"
                  });
                }
                this.send_email = false;
              });
          } else {
            this.send_email = false;
            this.$notify({
              group: "main",
              text: "You have tried too many times - please wait 3 Minutes",
              type: "error"
            });
          }
        });
    }
  }
};
</script>

<style>
.Checkbox__container {
  display: flex;
  align-items: center;
}

.vue-dialog {
  overflow-y: auto !important;
  max-height: 700px !important;
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
  position: relative;
}

.EmailVerif__Input img {
  padding: 15px 15px;
  border-left: 1px solid #e0e2e5;
  border-top: 1px solid #e0e2e5;
  border-bottom: 1px solid #e0e2e5;
}
</style>
