<template>
  <div class="Box__container">
      <div class="Box__inner">
      </div>
      <login/>
  </div>
</template>


<script>
import signup from './steps/signup'
import Login from './partials/login'
export default {
    components: {
        signup,
        login
    },
    data() {
    return {
        current_route: ''
        }
    }
}
</script>

<style>

.btn__signin span {
    margin-left:-10px;
}

.btn__signin img {
    height: 16px;
    width: 16px;
    float:left;
    padding-left:10px;
}

.text__grey {
    text-align:center !important;
    color: #b1b2b5;
    font-size:12px; 
}

#github {
    background-color: #24292E;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2);
}

#facebook {
    background-color: #415DAE;
    box-shadow: 0 4px 10px 0 rgba(56,87,154,0.2);
}

#linkedin {
    background-color: #007EBB;
    box-shadow: 0 4px 10px 0 rgba(0,126,187,0.3);
}
</style>
