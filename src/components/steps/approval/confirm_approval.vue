<template/>

<script>
export default {
  mounted() {
    this.$store
      .dispatch("confirmApproval", { token: this.$route.params.token })
      .then(response => {
        if (response.status === 200) {
          this.$store.commit("setCurrentUserObject", {
            object: response.data.user
          });
          if (
            response.data.user.approved &&
            response.data.user.approval_verified
          ) {
            this.$router.push("/pick_account");
          } else {
            this.$router.push("/");
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
