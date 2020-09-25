<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'electronapp'
  }
</script>

<style>
  /* CSS */
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* border-radius: 50%; */
    /* border: 1px solid green;
    pointer-events:auto;
    background: transparent; */
  }
</style>
