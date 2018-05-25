<template>
  <div class="Box__container">
    <div class="Box__inner">     
      <div class="Success">
        <h1>Thanks for confirming your phone number!</h1>
        <p>You’re a few steps away from getting to the top of the list.</p>
        <p>After validating your sign up request with us we’ll look it over for approval. As soon as your turn is up and you’re approved, you’ll be sent a link to finalize your account!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted() {
    this.$store.dispatch('requestApproval')
    .then(response => {
      if(response.status !== 200) {
        this.$notify({ group: 'main', text: 'We couldn\'t process your request. Please contact us on discord or support.utopian.io', type:'error' })
      }
    })
  }
}
</script>

<style>

.Box__key {
  height: 55.44px;
  width: 336px;
  border-left: 1px solid #E0E2E5;
}

.Success {
    height: 212px;
}

</style>
