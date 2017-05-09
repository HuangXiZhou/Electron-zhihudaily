<template lang="html">
  <div :class="[ loadingStyle === 'purple-white' ? 'loading-container' : 'loading-container--rna' ]">
    <div class="sk-folding-cube">
      <div class="sk-cube1" :class="[ loadingStyle === 'purple-white' ? 'sk-cube' : 'sk-cube--rna' ]"></div>
      <div class="sk-cube2" :class="[ loadingStyle === 'purple-white' ? 'sk-cube' : 'sk-cube--rna' ]"></div>
      <div class="sk-cube4" :class="[ loadingStyle === 'purple-white' ? 'sk-cube' : 'sk-cube--rna' ]"></div>
      <div class="sk-cube3" :class="[ loadingStyle === 'purple-white' ? 'sk-cube' : 'sk-cube--rna' ]"></div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "Loading",
    props: {
      loadingStyle: {
        type: String,
        default: "purple-white"
      }
    }
  }
</script>


<style lang="less" scoped>
  .loading-container {
    width: 100vm;
    height: 100vh;
    background: #7e57c2;
  }

  .loading-container--rna {
    width: 100vm;
    height: 100vh;
    background: #fff;
  }

  .sk-folding-cube {
    position: fixed;
    top: 43%;
    left: 46%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    position: relative;
    transform: rotateZ(45deg);
  }

  .sk-folding-cube .sk-cube, .sk-folding-cube .sk-cube--rna {
    float: left;
    width: 50%;
    height: 50%;
    position: relative;
    transform: scale(1.1); 
  }

  .sk-folding-cube .sk-cube--rna:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #7e57c2;
    animation: sk-foldCubeAngle 2.4s infinite linear both;
    transform-origin: 100% 100%;
  } 

  .sk-folding-cube .sk-cube:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    animation: sk-foldCubeAngle 2.4s infinite linear both;
    transform-origin: 100% 100%;
  }

  .sk-folding-cube .sk-cube2 {
    transform: scale(1.1) rotateZ(90deg);
  }

  .sk-folding-cube .sk-cube3 {
    transform: scale(1.1) rotateZ(180deg);
  }

  .sk-folding-cube .sk-cube4 {
    transform: scale(1.1) rotateZ(270deg);
  }

  .sk-folding-cube .sk-cube2:before {
    animation-delay: 0.3s;
  }

  .sk-folding-cube .sk-cube3:before {
    animation-delay: 0.6s; 
  }

  .sk-folding-cube .sk-cube4:before {
    animation-delay: 0.9s;
  }

  @-webkit-keyframes sk-foldCubeAngle {
    0%, 10% {
      transform: perspective(140px) rotateX(-180deg);
      opacity: 0; 
    } 25%, 75% {
      transform: perspective(140px) rotateX(0deg);
      opacity: 1; 
    } 90%, 100% {
      transform: perspective(140px) rotateY(180deg);
      opacity: 0; 
    } 
  }

  @keyframes sk-foldCubeAngle {
    0%, 10% {
      transform: perspective(140px) rotateX(-180deg);
      opacity: 0; 
    } 25%, 75% {
      transform: perspective(140px) rotateX(0deg);
      opacity: 1; 
    } 90%, 100% {
      transform: perspective(140px) rotateY(180deg);
      opacity: 0; 
    }
  }
</style>