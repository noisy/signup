<template>
<div class="Box__container">
      <div class="Box__inner">
        <div class="SaveKey__container">
          <loadingbar class="loadingbar"/>
            <h1>Your password key</h1>
              <p>Make sure to save your password key in a local safe and private. This key is not recoverable.</p>
                <div style="margin-bottom:30px;"  class="PickAccount__Input">
                  <img src="./../../assets/ic_key.svg"><div class="Box__key" placeholder="Enter your username"></div>
                </div>
                <div class="SaveKey__footer">
                  <button class="Btn__blue Btn__save" @click="saveKey()"><img src="./../../assets/ic_download.svg">SAVE</button>
                  <a href="https://v2.steemconnect.com/oauth2/authorize?client_id=utopian.app&response_type=code&redirect_uri=https%3A%2F%2Futopian.io%2Fcallback&scope=vote,comment,comment_delete,comment_options,custom_json,claim_reward_balance,offline" v-show="saved_key" to="login" class="Login__text">LOGIN</a>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import loadingbar from './../partials/loading_bars/loading_bar_end.vue'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'chosenAccountName'
    ])
  },
  watch: {
    input_account: function() {
      this.getAccount()
    },

  },
  components: {
    loadingbar
  },
  data() {
    return {
      saved_key: false,
      input_account: '',
      input_error: ''
    }
  },
  methods: {
    saveKey() {
      this.saved_key = true
    }
  }
}
</script>

<style>

.loadingbar {
  margin-top:12px !important;
  margin-bottom:12px !important;
}

.SaveKey__footer {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position:relative;
}

.PickAccount__Input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #E0E2E5;
	border-radius: 2px;
}

.PickAccount__Input img {
  padding: 0 15px;
}

.Box__key {
  height: 55.44px;
  width: 336px;
  border-left: 1px solid #E0E2E5;
}

.Input__utopian {
	height: 39.44px;
	flex:1;
  margin-right:10px;
  padding-left:15px;
	border: 1px solid #E0E2E5;
	border-radius: 2px;
}

.Login__text {
  color: #2AA0F8;
  text-decoration: none;
	font-family: "Noto Sans";
	font-size: 12px;
	font-weight: bold;
	line-height: 16px;
  position: absolute;
  right: 25px;
}



.Btn__save {
    margin: 0 auto;
}

.Btn__save img {
  margin-right:10px;
  margin-left:-8px;
}

.Btn__save:before {
  
}

</style>
