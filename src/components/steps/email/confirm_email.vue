<template>
  <div />
</template>

<script>
export default {
  mounted() {
    this.$store
      .dispatch("confirmMail", { token: this.$route.params.token })
      .then(response => {
        if (response.status === 200) {
          this.$store.commit("setCurrentUserObject", {
            object: response.data.user
          });
          if (
            response.data.user.social_verified ||
            (response.data.user.email_verified &&
              response.data.user.invite_verified)
          ) {
            this.$router.push("/pick_account");
          } else {
            this.$router.push("/verify_phone");
          }
        } else {
          this.$notify({
            group: "main",
            text: response.data.message,
            type: "error"
          });
          this.$router.push("/");
        }
      });
  }
};
</script>

<style>
</style>
