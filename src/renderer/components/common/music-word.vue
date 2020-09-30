<template>
  <section class="music-word-warp" :class="isShowOption?'active':''">
   
    <div class="play-btn" v-if="!isShowOption">
      <span class="iconfont icon-jiantouarrowhead7" @click="upMusic" v-if="isCanUpMusic"></span>
      <span class="iconfont icon-jiantouarrowhead7 grey" v-else></span>
      <div
        class="iconfont"
        @click="playProcess(true)"
        :class="isPlay ? 'icon-bofang_':'icon-bofang2'"
      >
        <audio id="mp3Btn1" ref="audio1">
          <source :src="url" type="audio/mpeg" />
        </audio>
      </div>
      <span class="iconfont icon-jiantou" @click="downMusic" v-if="isCanDownMusic"></span>
      <span class="iconfont icon-jiantou grey" v-else></span>
      <span class="iconfont icon-guanbi" @click="clickWord"></span>
    </div>
    <div class="am-words" @mouseenter="mouseColorChange" @mouseleave="mouseLeaveChange">
      {{$store.state.Counter.currentObj.name}}
    </div>
  </section>
</template>
<script>
import { ipcRenderer, remote ,dialog} from "electron";
import { music } from "@/music-data.js";
export default {
  data() {
    return {
      isPlay: false,
      isCanUpMusic: true,
      url:'',
      isCanDownMusic: true,
      isShowOption:false
    };
  },
  methods: {
    // 点击播放按钮
    playProcess(flag) {
      console.log( this.$parent)
      // this.$parent.$parent.playProcess(2)
      this.url = this.$store.state.Counter.currentObj.path;
      this.$refs.audio1.src = this.url;
      // 阻止冒泡
      if (event) {
        event.stopPropagation();
      }
      const audio = document.getElementById("mp3Btn1");
      if (flag) {
        if (audio.paused) {
          // 如果当前状态是暂停的状态
           audio.play();
         
          this.isPlay = false;
        } else {
          audio.pause();
          this.isPlay = true;
        }
      } else {
        audio.pause();
        audio.play();
        this.isPlay = true;
      }
    },
    // 上一首
    upMusic() {
      this.findNext("up");
      this.playProcess();
    },
    //下一首
    downMusic() {
      this.findNext("down");
      this.playProcess();
    },
    // 查找数据
    findNext(val) {
      let index = 0;
      for (let i = 0; i < this.$store.state.Counter.musiclist.length; i++) {
        if (
          this.$store.state.Counter.musiclist[i].id ===
          this.$store.state.Counter.currentObj.id
        ) {
          index = i;
        }
      }
      if (val == "up") {
        if (index > 0) {
          this.$store.dispatch(
            "submitCurrentPath",
            this.$store.state.Counter.musiclist[index - 1]
          );
        } else {
          this.isCanUpMusic = false;
        }
      } else {
        if (index + 1 < this.$store.state.Counter.musiclist.length) {
          this.$store.dispatch(
            "submitCurrentPath",
            this.$store.state.Counter.musiclist[index + 1]
          );
        } else {
          this.isCanDownMusic = false;
        }
      }
    },
    clickWord () {
        ipcRenderer.send('closemusicWords')
    },
    // 鼠标经过文字透明度改变
    mouseColorChange () {
      this.isShowOption = true;
    },
    // 鼠标离开文字透明度改变
    mouseLeaveChange () {
      this.isShowOption = false;
    }, 
  }
};
</script>
<style>
html,body,#app {
  background: transparent;
}
</style>
<style scoped lang="scss">

.music-word-warp {
  background:transparent;
  height: 100%;
  -webkit-app-region: drag;
  display: flex;
  justify-content: center;
    align-content: center;
    align-items: center;
    &.active {
       background: rgba(166, 175, 217 ,0.6);
    }
  // flex-direction: column;
  .play-btn {
    -webkit-app-region:no-drag;
    display: flex;
    
    flex: 1;
    width: 240px;
    height: 100px;
    margin-right: 50px;
    align-items: center;
    text-align: center;
    .icon-guanbi {
      font-size: 30px;
    }
    span,
    p {
      flex: 1;
      &:hover {
        color: slateblue;
        cursor: pointer;
        .icon-jiantouarrowhead7 {
          &.grey {
            color: #f7f7f7;
          }
        }
        .icon-jiantou {
          &.grey {
            color: #696565;
          }
        }
      }
    }
    .icon-jiantou {
      &.grey {
        color: #696565;
      }
    }
    .icon-jiantouarrowhead7 {
      &.grey {
        color: #696565;
      }
    }
    .icon-bofang2,
    .icon-bofang_ {
      color: slateblue;

      &::before {
        font-size: 40px;
      }
    }
  }
  .am-words {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 0 30px;
    color: blueviolet;
  }
}
</style>