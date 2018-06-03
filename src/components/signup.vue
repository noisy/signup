<template>
  <div class="Box__container">
    <div class="Box__inner">
      <div>
        <h1>Welcome to Utopian.io</h1>
        <p>Register with your GitHub account to get instant access to Utopian services and a free STEEM account and wallet. <a 
          href="https://join.utopian.io" 
          target="_blank">Learn More About Utopian</a></p>
        <div>
          <vue-recaptcha
            ref="recaptcha"
            :sitekey="recaptchaKey"
            @verify="onGithubCaptchaVerified"
            @expired="onGithubCaptchaExpired">
            <button
              id="github"
              :disabled="status==='submitting'"
              class="btn__signin">
              <img src="./../assets/ic_github.svg"><span>SIGN IN WITH GITHUB</span>
            </button>
          </vue-recaptcha>
          <small>The GitHub account linked to the Utopian services cannot be changed.</small>
        </div>
        <!--<div><button class="btn__signin" id="facebook" @click="authenticate('facebook')"><img src="./../assets/ic_facebook.svg"><span>SIGN IN WITH FACEBOOK</span></button></div>-->
        <!--<div><button class="btn__signin" id="linkedin" @click="authenticate('linkedin')"><img src="./../assets/ic_linkedIn.svg"><span>SIGN IN WITH LINKEDIN</span></button></div>-->
        <!--<div><button class="btn__signin" id="email" @click="signIn('/verify_mail')"><img src="./../assets/ic_email.svg"><span>SIGN IN WITH EMAIL </span></button></div>-->
        <!--<p style="margin-bottom:0">Accounts will be created on the TESTNET for now.</p>-->
      </div>
    </div>
    <Login/>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import VueRecaptcha from "vue-recaptcha";
import Login from "./partials/login";
export default {
  name: "Signup",
  components: {
    Login,
    VueRecaptcha
  },
  data() {
    return {
      recaptchaKey: process.env.RECAPTCHA_KEY
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    signIn(to) {
      this.$router.push(to);
    },
    onGithubCaptchaVerified() {
      const self = this;
      self.status = "submitting";
      self.$refs.recaptcha.reset();
      self.authenticate("github");
    },
    onGithubCaptchaExpired() {
      this.$refs.recaptcha.reset();
    },
    authenticate(provider) {
      if (this.$cookies.get("c_a"))
        return this.$notify({
          group: "main",
          text: "You have already created an account through Utopian",
          type: "error"
        });
      this.$store.dispatch("authenticate", { provider }).then(response => {
        if (response.status !== 200) {
          this.$notify({
            group: "main",
            text: response.message,
            type: "error"
          });
          return this.$router.push("/");
        }
        let user = response.data.user;
        if (user.has_created_account) {
          this.$notify({
            group: "main",
            text:
              "This social account has already been used to create an account",
            type: "error"
          });
          return this.$router.push("/");
        }
        this.$router.push("/connect_account");
      });
    }
  }
};
</script>

<style>
.Signup {
  padding: 16px 25px 28px 25px;
  display: flex;
  flex-flow: column;
  height: 276px;
  width: 388px;
  border: 1px solid #e4e5e8;
  border-radius: 2px;
  background-color: #ffffff;
}
.Signup h1 {
  text-align: left;
  margin: 5px 0;
}
.Signup p {
  text-align: left;
  margin: 5px 0 25px 0;
}
.btn__signin {
  height: 40px;
  width: 100%;
  font-size: 12px;
  line-height: 16px;
  border-radius: 2px;
  margin-bottom: 8px;
  cursor: pointer;
  outline: none;
}
.btn__signin span {
  margin-left: -10px;
}
.btn__signin img {
  height: 16px;
  width: 16px;
  float: left;
  padding-left: 10px;
}
.text__grey {
  text-align: center !important;
  color: #b1b2b5;
  font-size: 12px;
}
.btn__signin[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
#github {
  background-color: #24292e;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
}
#facebook {
  background-color: #415dae;
  box-shadow: 0 4px 10px 0 rgba(56, 87, 154, 0.2);
}
#linkedin {
  background-color: #007ebb;
  box-shadow: 0 4px 10px 0 rgba(0, 126, 187, 0.3);
}
#email {
  background-color: #8530c3;
  box-shadow: 0 4px 10px 0 rgba(0, 126, 187, 0.3);
}
</style>
