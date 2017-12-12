<template>
  <div class="Login__container">
      <div class="Login__left">
          <div class="Login__form">
              <img class="Logo" src="../assets/Utopian_logo.png">
              <input class="Input__utopian Input__username" placeholder="Enter your username"></input>
              <input class="Input__utopian Input__password" placeholder="Password or WIF" type="password"></input>
              <button class="Btn__blue Btn__login" @click="Login()">LOGIN</button>
          </div>
          <div><p class="text__grey">Create an Utopian account <router-link to="signup">here</router-link></p></div>
      </div>
      <div class="Login__right">
      </div>
  </div>
</template>

<script>
export default {
    methods: {
        login() {
            
        }
    }
}
</script>

<style>

.Login__container {
    display: flex;
    flex-flow: row;
    height:100vh;
}

.Login__left {
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width:350px;
}

.Login__form .Logo {
    width: fit-content;
    margin:0 auto;
    margin-bottom:25px;
}

.Login__right {
    flex:3;
    background-image: url('../assets/hero_image.png')
}

.Login__form {
    display: flex;
    flex-flow:column;
    width:242px;
}

.Login__form input {
    margin-bottom:10px;
}

.Btn__login {
    margin:0 auto;
    width:100%;
}

.Btn__login:before {
}

.Input__password:before {

}

.Input__pasword:after {
    
}

</style>
