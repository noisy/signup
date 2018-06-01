<template>
  <div class="progress-bar">
    <span class="bar">
      <span class="progress"/>
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style>
@-webkit-keyframes loader {
  0% {
    width: 50;
  }
  100% {
    width: 100%;
  }
}

@keyframes loader {
  0% {
    width: 50;
  }

  100% {
    width: 100%;
  }
}
.progress-bar {
  border-radius: 60px;
  overflow: hidden;
  width: 100%;
}
.progress-bar span {
  display: block;
}

.bar {
  background: rgba(0, 0, 0, 0.075);
}

.progress {
  -webkit-animation: loader 1s 0.5s ease forwards;
  animation: loader 1s 0.5s ease forwards;
  background: #4786ff;
  color: #fff;
  padding-top: 4px;
  padding-right: 50%;
  width: 0;
}

.progress-bar {
  margin: 0 auto;
  width: 100%;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
</style>
