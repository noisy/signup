<template>
  <div class="Navbar__container">
      <div class="Navbar__inner">
          <div class="left"><a class="Topnav__brand" href="/"><img id="MainLogo" src="../../assets/utopian-sole.png"></a>
      <span class="Topnav__version"><a class="Topnav__version" href="/"><span>&nbsp;&nbsp;</span>beta</a></span></div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>
.left {
    float:left;
    margin-left:15px;
}

.Navbar__container {
    height: 55px;
    width:100%;
    background-color: #000;/* #24292E;*/
    box-shadow: inset 0 -1px 0 0 #EDEDED;
    display:flex;
    align-items: center;
}

.Navbar__inner {
    position: relative;
    margin: 0 auto;
    max-width: 1010px;
    width:100%;
}

.Navbar__logo {
    margin-left:20px;
    height: 30.77px;
    width: 30.77px;
}

.Navbar__name {
    margin-left:15px;
}

.Topnav__version, .Topnav__version:hover {
    text-decoration: none;
}

.Topnav__version {
    margin-left: -2px;
    color: #99aab5!important;
    font-weight: 300;
}

.Topnav__brand img {
    padding-top: 0;
    height: 40px;
    vertical-align: middle;
}

@media screen and (max-width: 736px) {
.Topnav__brand img {
    padding-top: 0;
    padding-bottom: 0;
    height: 35px;
    vertical-align: middle;
}
}
</style>
