const state = {
  currentObj:{},
  musiclist:[],
  // 播放上一首
  isUpMusic:false,
   // 播放下一首
  isDownMusic:false
}

const mutations = {
  // 存放当前链接
  SET_CURRENTURL (state,currentObj) {
    state.currentObj = currentObj;
  },
  // 音乐列表
  SET_MUSICLIST (state,musiclist) {
    state.musiclist = musiclist;
  },
  // 播放上一首
  SET_UPMUSIC (state,isUpMusic) {
    state.isUpMusic = isUpMusic;
  },
  // 播放下一首
  SET_DOWNMUSIC (state,isDownMusic) {
    state.isDownMusic = isDownMusic;
  }
}

const actions = {
  // 当前播放的文件路径
  submitCurrentPath ({ commit },context) {
    commit('SET_CURRENTURL',context)
  },
  // 音乐列表
  musicListState ({commit},context) {
    commit('SET_MUSICLIST',context)
  },
   // 播放上一首
   musicUpCut ({commit},context) {
    commit('SET_UPMUSIC',context)
   },
   // 播放下一首 
   musicDownCut ({commit},context) {
    commit('SET_DOWNMUSIC',context)
   }
}
export default {
  state,
  mutations,
  actions
}
