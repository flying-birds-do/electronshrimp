const state = {
  main: 0,
  currentObj:{},
  musiclist:[]
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  // 存放当前链接
  SET_CURRENTURL (state,currentObj) {
    state.currentObj = currentObj;
  },
  SET_MUSICLIST (state,musiclist) {
    state.musiclist = musiclist;
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  // submit
  submitCurrentPath ({ commit },context) {
    commit('SET_CURRENTURL',context)
  },
  musicListState ({commit},context) {
    commit('SET_MUSICLIST',context)
  }
}
export default {
  state,
  mutations,
  actions
}
