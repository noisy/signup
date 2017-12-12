<template>
  <div class="Navbar__container">
      <div class="Navbar__logo">
          <a href="/"> <img src="../../assets/Topbar_logo.png"></a>
      </div>
      <!--<div class="Navbar__name">UTOPIAN</div>-->
  </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>
.Navbar__container {
    height: 55px;
    width:100%;
    background-color: #24292E;
    box-shadow: inset 0 -1px 0 0 #EDEDED;
    display:flex;
    align-items: center;
}

.Navbar__logo {
    margin-left:20px;
    height: 30.77px;
    width: 30.77px;
}

.Navbar__name {
    margin-left:15px;
}
</style>
