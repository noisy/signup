<template>
  
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('confirmMail', { token: this.$route.params.token })
        .then(response => {
            if(response.status === 200) {
                this.$store.commit('setCurrentUserObject', { object: response.data.user })
                if(user.social_verified || user.sms_verified) {
                    this.$router.push('/pick_account')
                } else { this.$router.push('/verify_phone') }
                
            } else {
                // display error
                this.$notify({ group: 'main', text: response.response.data.message, type:'error' })
            }
        })
    }
}
</script>

<style>

</style>
