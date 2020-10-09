<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'electronapp',
    data () {
      return {
      }
    },
    methods:{
        // playProcess () {
        //   debugger
        //   this.$refs.child.playProcess()
        // },
        // findNext(val) {
        //    this.$refs.child.findNext(up)
        // }
    },
    computed:{
      isPlayProgress() {
        return this.$store.state.Counter.isPlayProgress;
      }
    }
  }
</script>

<style>
  /* CSS */
  html,body ,#app {
    background: transparent;
  }
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
