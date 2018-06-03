<template>  
  <div 
    v-if="isLoading" 
    id="cover">
    <svg 
      class="spinner" 
      viewBox="0 0 24 24">
      <path 
        fill="#4786ff" 
        d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
    </svg>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Loader",
  computed: {
    ...mapGetters({
      isLoading: "loader/isLoading"
    })
  }
};
</script>

<style scoped>
#cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  text-align: center;
  display: flex;
  justify-content: center;
}
.spinner {
  align-self: center;
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  width: 50px;
  height: 50px;
  margin: 15px;
}

@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
