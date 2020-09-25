import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    // createPersistedState用于vuex的state持久化，让其页面刷新后vuex不丢失，主要是使用了localStrorage
    createPersistedState(),
    // createSharedMutations是用于electron主线程与渲染线程中，而它会导致vuex的this.$store.dispatch失效（mapActions也失效），
    // 解决方式：1.在主线程的index.js中加入 import store from ‘…/renderer/store’，但需要注意的则是这样vuex里不可以使用渲染线程相关的api；2.注释掉createSharedMutations。
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
