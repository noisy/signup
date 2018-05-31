<template>
  <div>
    <Loader />
    <div v-show="!isLoading" id="app">
      <navbar v-if="$route.name !== 'login'"></navbar>
      <notifications style="margin-top:75px;" position="top center" group="main" />
      <router-view/>
    </div>
  </div>
</template>

<script>
import navbar from './components/partials/navbar.vue'
import Loader from './components/partials/loader.vue'

import { mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      current_route: ''
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'loader/isLoading',
    })
  },
  components: {
    navbar,
    Loader
  }
}
</script>

<style>
.header {
    top: 0;
    left: 0;
    width: 100%;
    min-height:55px;
    transition: all .3s;
    z-index: 100;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.035);
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin:0;
  font-family: 'Lato', sans-serif;
  background-color: #FAFBFC;
}

h1, h2, h3, h4, p {
  font-family: 'lato' !important;
}

button {
  border-color:transparent;
  color: #FFFFFF;
  font-family: 'Noto Sans', serif;
}

a {
  color: #386DFF;
}

.Box__container {
    display: flex;
    flex-flow:column;
    align-items: center;
    min-height:35rem;
    height:calc(100vh-55px);
    justify-content: center;
}

.Box__inner {
  padding:16px 25px 28px 25px;
  display: flex;
  flex-flow: column;
  border: 1px solid #E4E5E8;
  border-radius: 2px;
  background-color: #FFFFFF;
  font-family: 'Lato';
  width: 348px;
}

.Box__inner h1, p {
  text-align: left;
}

.Box__inner h1 {
  margin:5px 0;
  font-size:21px;
  letter-spacing: 1px;
}

.Box__inner p {
  margin:5px 0 25px 0;
  color: #030303;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
}

.btn__signin {
    height: 40px;
    width: 100%;
    font-size:12px;
    line-height:16px;
    border-radius: 2px;
    margin-bottom:8px;
    cursor: pointer;
    outline: none;
}


.Input__utopian {
	height: 39.44px;
	flex:1;

  padding-left:15px;
	border: 1px solid #E0E2E5;
	border-radius: 2px;
}

.Btn__blue {
	height: 39.44px;
	width: 97px;
	border-radius: 2px;
	background-color: #4786FF;
	box-shadow: 0 4px 10px 0 rgba(71,134,255,0.4);
  font-size:12px;
  line-height:16px;
}

.Btn__light {
  height: 25.44px;
	width: 70px;
	border-radius: 2px;
	background-color: rgb(87, 87, 87);
	box-shadow: 0 4px 10px 0 rgba(129, 129, 129, 0.4);
  font-size:12px;
  line-height:16px;
  cursor: pointer;
}

.Btn__light[disabled] {
  opacity:0.5;
  cursor: not-allowed;
}

.Btn__light:hover {
  background-color: #757575;
}


.Btn__blue[disabled] {
  opacity:0.5;
  cursor: not-allowed;
}

.Btn__blue:hover {
  background-color: #5d93ff;
}

.text__error {
  color:#ff0264 !important;
  font-size:14px !important;
}

.text__success {
  color:#28a745 !important;
  font-size:14px !important;
}

.text__grey {
    text-align:center !important;
    color: #b1b2b5;
    font-size:12px; 
}

input, button {
  outline: none;
}

.clickable_link {
  cursor: pointer;
}

::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:    #B7BCC0;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:    #B7BCC0;
   opacity:  1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color:    #B7BCC0;
   opacity:  1;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color:    #B7BCC0;
}
::-ms-input-placeholder { /* Microsoft Edge */
   color:    #B7BCC0;
}

::placeholder { /* Most modern browsers support this now. */
   color:    #B7BCC0;
}
</style>
