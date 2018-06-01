<template>
  <div class="Box__container">
    <div class="Box__inner">     
      <div 
        v-if="success === true" 
        class="Success">
        <h1>Success!</h1>
        <p>Thanks for confirming your Steem account!</p>
        <p>Your Utopian.io account was successfully created.</p>
      </div>
      <div 
        v-if="success === false" 
        class="Error">
        <h1>Error!</h1>
        <p>We couldn't create your account. Please try again or contact us at support.utopian.io</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      success: null
    };
  },
  mounted() {
    this.$store
      .dispatch("createUserFromSteemAccount", {
        access_token: this.$route.query.access_token,
        steem_account: this.$route.query.username,
        user_id: this.$route.query.state
      })
      .then(res => {
        if (res.status == 200) {
          this.success = true;
        } else {
          this.success = false;
          this.$notify({
            group: "main",
            text: res.data.message,
            type: "error"
          });
        }
      });
  }
};
</script>

<style>
.Box__key {
  height: 55.44px;
  width: 336px;
  border-left: 1px solid #e0e2e5;
}

.Success {
  height: 100px;
}

.Error {
  height: 100px;
}
</style>
