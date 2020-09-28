<template>
  <section class="defalut-warp">
    <section class="default-info-warp">
      <div class="default-top-warp clearfix">
        <div class="defalut-menu-left">
          <div class="logo">
            <img src="@/assets/images/logo.jpg" alt />
            <div class="title-slign">
              <p class="title">小虾音乐</p>
              <span class="slign">不忘初心,总在原地</span>
            </div>
          </div>
          <div class="munu-list-warp">
            <h3>音乐库</h3>
            <ul class="munu-list">
              <li>
                <i class="iconfont icon-faxian"></i>发现音乐
              </li>
              <li>
                <i class="iconfont icon-yinle2"></i>歌单
              </li>
              <li>
                <i class="iconfont icon-paihangbang"></i>排行榜
              </li>
            </ul>
          </div>
          <div class="munu-list-warp">
            <h3>我的音乐</h3>
            <ul class="munu-list">
              <li>
                <i class="iconfont icon-bendishenghuo"></i>本地歌曲
              </li>
              <li>
                <i class="iconfont icon-zuijinfangwen-"></i>最近播放
              </li>
              <li>
                <i class="iconfont icon-yinle10"></i>我的收藏
              </li>
              <li>
                <i class="iconfont icon-yigoushuliang"></i>已购音乐
              </li>
            </ul>
          </div>
          <div class="munu-list-warp">
            <h3 class="my-music-list">
              我的歌单(0)
              <i>+</i>
            </h3>
          </div>
        </div>
        <div class="defalut-content-right">
          <div class="default-top-info-warp">
            <div class="default-top-info">
              <div class="fresh-warp">
                <span class="icon-arrow">
                  <i class="iconfont icon-jiantouarrowhead7"></i>
                  <i class="iconfont icon-jiantou"></i>
                </span>
                <span class="fresh iconfont icon-shuaxinzhongjieban" @click="freshMusicList"></span>
                <div class="search-warp">
                  <i class="iconfont icon-sousuo"></i>
                  <input type="text" />
                </div>
              </div>
              <div class="setting-warp">
                <div class="head-img">
                  <img :src="$store.state.Counter.currentObj.urlimage" alt />
                  <p>昏睡的月饼</p>
                </div>
                <span class="iconfont icon-icon-test" @click="setting"></span>
                <span class="iconfont icon-zuixiaohua" @click="minisize"></span>
                <span
                  class="iconfont"
                  @click="maxsize"
                  :class="isMaxSize ?'icon-zuidahua2':'icon-zuidahua'"
                ></span>
                <span class="close iconfont icon-guanbi5" @click="closeWindow"></span>
              </div>
            </div>
          </div>
          <div class="asynic-content">
            {{$store.currentObj}}
            <router-view />
          </div>
        </div>
      </div>
      <div class="default-bottom-warp">
        <div class="simply-image-warp">
          <img :src="$store.state.Counter.currentObj.urlimage" alt class="out-img" />
          <div class="music-name">
            <h3>{{$store.state.Counter.currentObj.name}}</h3>
            <span>{{$store.state.Counter.currentObj.autor}}</span>
          </div>
          <div class="music-type">
            <h3>标准</h3>
            <!-- <ul>
              <li>标准音乐</li>
              <li>高品质</li>
              <li>无损品质</li>
            </ul> -->
          </div>
          <span class="collect iconfont icon-xihuan2"></span>
          <div class="more-operate">
            <h3>...</h3>
            <ul>
              <li @click="randomPlayMusic">漫游相似歌曲</li>
              <li>下载</li>
              <li>评论</li>
            </ul>
          </div>
        </div>
        <div class="play-operate">
          <!-- <audio controls="controls" autoplay="autoplay" @click="clickControls">
              <source :src="url" type="audio/mpeg" />
              Your browser does not support the audio element.
          </audio>-->
          <div class="play-btn">
            <!--  -->

            <span class="iconfont icon-jiantouarrowhead7" @click="upMusic" v-if="isCanUpMusic"></span>
            <span class="iconfont icon-jiantouarrowhead7 grey" v-else></span>
            <!-- <p class="iconfont icon-bofang2"></p>  -->
            <div
              class="iconfont"
              @click="playProcess(true)"
              :class="isPlay ? 'icon-bofang_':'icon-bofang2'"
            >
              <audio id="mp3Btn" ref="audio">
                <source :src="url" type="audio/mpeg" />
              </audio>
            </div>
            <span class="iconfont icon-jiantou" @click="downMusic" v-if="isCanDownMusic"></span>
            <span class="iconfont icon-jiantou grey" v-else></span>
          </div>
        </div>

        <div class="radio-operate">
          <p class="iconfont icon-yinliang"></p>
          <span class="reclce-btn iconfont icon-icon-">
             <i class="small-tip">单曲循环</i>
          </span>
          <!-- <span class="music-ablity iconfont icon-yinle8">
            <i class="small-tip">歌词</i>
          </span> -->
          <span class="music-text iconfont icon-geciweidianji" @click="findMusicWord"> 
            <i class="small-tip">歌词</i>
            </span>
          <span class="music-list iconfont icon-liebiao1" @click="openCloseList">
            <i class="small-tip">歌曲列表</i>
          </span>
        </div>
  <!-- 歌曲列表 -->
        <div id="menu" class="menu-warp" v-show="isOpenMusicList">
          <div class="menu-item" v-for="(item,index) in this.$store.state.Counter.musiclist" :key="index" :class="item.id == $store.state.Counter.currentObj.id ?'active':''">{{item.name}}</div>
        </div>
      </div>
      <!--  歌词 -->
      <div class="music-word-warp">
        <div class="operate-table">

        </div>
        <p>我是歌词</p>
      </div>
    </section>
  </section>
</template>
<script>
import { ipcRenderer, remote ,dialog} from "electron";
import { music } from "@/music-data.js";

export default {
  data() {
    return {
      isMaxSize: true,
      url: "",
      isPlay: false,
      isCanUpMusic: true,
      isCanDownMusic: true,
      isOpenMusicList:false
    };
  },
  mounted() {
    let win = remote.getCurrentWindow();
    const path = require("path");
    this.url = "@assets/music/爱若琉璃.mp3";
    win.on("maximize", _ => {
      this.isMaxSize = false;
      this.setState();
    });
    this.isMaxSize = win.isMaximized();
    this.getState();
  },
  methods: {
    // 点击播放按钮
    playProcess(flag) {
      this.url = this.$store.state.Counter.currentObj.path;
      this.$refs.audio.src = this.url;
      // 阻止冒泡
      if (event) {
        event.stopPropagation();
      }
      const audio = document.getElementById("mp3Btn");
      if (flag) {
        if (audio.paused) {
          // 如果当前状态是暂停的状态
          audio.pause();
          this.isPlay = false;
        } else {
          audio.play();
          this.isPlay = true;
        }
      } else {
        audio.pause();
        audio.play();
        this.isPlay = true;
      }
    },
    // 随机播放歌曲
    randomPlayMusic () {
      let list = this.$store.state.Counter.musiclist;
       this.$store.dispatch(
            "submitCurrentPath",
           list[Math.floor(Math.random() * list.length)]
          );
          this.playProcess()
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
    setState() {
      let win = remote.getCurrentWindow();
      let rect = win.getBounds();
      let isMaxSize = win.isMaximized();
      let obj = { rect, isMaxSize };
      localStorage.setItem("winState", JSON.stringify(obj));
    },
    getState() {
      let win = remote.getCurrentWindow();
      let winState = localStorage.getItem("winState");
      if (winState) {
        winState = JSON.parse(winState);
        if (winState.isMaxSize) win.maximize();
        else win.setBounds(winState.rect);
      }
    },
    // 点击关闭
    closeWindow() {
      // 通知主进程退出应用
      ipcRenderer.send("synchronous-message", "close");
    },
    setting() {
      //  设置
    },
    // 最小化
    minisize() {
      // 通知主进程最小化
      ipcRenderer.send("synchronous-message", "min");
    },
    // 最大化
    maxsize() {
      // 通知主进程最大化
      ipcRenderer.send("synchronous-message", "max");
    },
    openCloseList () {
      this.isOpenMusicList = !this.isOpenMusicList;
    },
    // 刷新音乐列表
    freshMusicList  () {
     location.reload();
    },
    // 查找歌词
    findMusicWord () {
      let currentMusicName = this.$store.state.Counter.currentObj.name;
      if(currentMusicName) {

      } 
    }
  },
  watch: {}
};
</script>
<style scoped lang="scss">
.defalut-warp {
  width: 100%;
  height: 100%;
  .btn-audio {
    margin: 90px auto;
    width: 186px;
    height: 186px;
    // background: url(images/voice_stop.png) no-repeat center bottom;
    background-size: cover;
  }
  // background: #fff;
  .default-info-warp {
    display: flex;
    height: 100%;
    flex-direction: column;
    .default-top-warp {
      width: 100%;
      height: 100%;
      display: flex;
      .defalut-menu-left {
        width: 240px;
        height: 100%;
        background: rgb(247, 247, 247);
        padding-top: 30px;
        padding-left: 5px;
        .logo {
          display: flex;
          margin-bottom: 40px;
          img {
            width: 60px;
            height: 60px;
          }
          .title-slign {
            flex: 1;
            margin-left: 10px;
            .title {
              font-size: 30px;
            }
            .slign {
              font-size: 14px;
              color: #9c9c9c;
            }
          }
        }
        .munu-list-warp {
          padding-top: 40px;
          padding-left: 10px;
          h3 {
            margin-bottom: 20px;
            color: #999;
            font-size: 16px;
          }
          .my-music-list {
            i {
              width: 16px;
              height: 16px;
              display: inline-block;
              border: 1px solid #9c9c9c;
              margin-left: 10px;
              border-radius: 50%;
              text-align: center;
              line-height: 14px;
              cursor: pointer;
            }
          }
        }
        .munu-list {
          li {
            line-height: 40px;
            color: #333;
            cursor: pointer;
            font-size: 14px;
            &:hover {
              color: slateblue;
            }
            .iconfont {
              margin-right: 10px;
              font-size: 16px;
              width: 20px;
              &.icon-paihangbang {
                font-size: 12px;
                margin-left: -4px;
              }
              &::before {
                width: 20px;
              }
            }
          }
        }
      }
      .defalut-content-right {
        flex: 1;
        display: flex;
        flex-direction: column;

        .default-top-info-warp {
          height: 120px;
        }
        .default-top-info {
          padding-left: 30px;
          width: 100%;
          height: 120px;
          background: rgb(247, 247, 247);
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          div {
            flex: 1;
            &.fresh-warp {
              display: flex;
              line-height: 30px;
              .icon-arrow {
                i {
                  &:first-child {
                    margin-right: 20px;
                  }
                }
              }
              .search-warp {
                position: relative;
                .icon-sousuo {
                  position: absolute;
                  left: 10px;
                  top: 50%;
                  z-index: 30;
                  transform: translateY(-50%);
                  color: #fff;
                }
                input {
                  width: 360px;
                  height: 38px;
                  padding-left: 30px;
                  border-radius: 30px;
                  border: none;
                  background: rgba(0, 0, 0, 0.2);
                  color: #fff;
                }
              }
            }
            &.setting-warp {
              display: flex;
              line-height: 30px;
              .iconfont {
                &:hover {
                  color: slateblue;
                }
              }
            }
          }
          span {
            margin-right: 50px;
            height: 20px;
          }
          .head-img {
            display: flex;
            line-height: 30px;
            margin-left: 40px;
            margin-left: 80px;
            img {
              width: 30px;
              height: 30px;
              margin-right: 10px;
              border-radius: 50%;
              overflow: hidden;
            }
          }
        }
        .asynic-content {
          overflow-y: auto;
          padding: 20px;
        }
      }
    }
    .default-bottom-warp {
      width: 100%;
      height: 100px;
      background: rgb(247, 247, 247);
      display: flex;
      justify-content: space-between;
      align-items: center;
      // -webkit-app-region:drag;
      .simply-image-warp {
        flex: 1;
        display: flex;
        align-items: center;
        height: 100px;
        .out-img {
          width: 80px;
          height: 80px;
          margin-top: 10px;
        }
        .music-name {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 6px;
          h3 {
            font-size: 16px;
            line-height: 16px;
            color: #000;
            margin-bottom: 10px;
          }
          span {
            font-size: 12px;
            color: #9c9c9c;
          }
        }
        .music-type {
          position: relative;
          width: 150px;
          margin-left: 50px;
          &:hover {
            cursor: pointer;
            ul {
              display: block;
            }
          }
          ul {
            position: absolute;
            right: 33px;
            top: -74px;
            // width: 100px;
            background: #fff;
            z-index: 30;
            padding: 10px;
            border-radius: 4px;
            text-align: center;
            display: none;
            li {
              line-height: 24px;
              cursor: pointer;
              font-size: 14px;
              &:hover {
                cursor: pointer;
                color: slateblue;
              }
            }
          }
        }
        .collect {
          width: 60px;
          display: flex;
          align-items: center;
        }
        .more-operate {
          position: relative;
          width: 150px;
          cursor: pointer;
          &:hover {
            h3 {
              color: slateblue;
            }
            ul {
              display: block;
            }
          }
          ul {
            position: absolute;
            right: 27px;
            top: -74px;
            // width: 100px;
            background: #fff;
            z-index: 30;
            padding: 10px;
            border-radius: 4px;
            text-align: center;
            display: none;
            li {
              line-height: 24px;
              cursor: pointer;
              font-size: 14px;
              &:hover {
                color: slateblue;
              }
            }
          }
        }
      }
      .play-operate {
        flex: 1;
        display: flex;
        justify-content: center;
        text-align: center;
      }
      .play-btn {
        display: flex;
        width: 240px;
        height: 100px;
        margin-right: 50px;
        align-items: center;
        text-align: center;
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
      .radio-operate {
        flex: 1;
        display: flex;
        justify-items: center;
        align-items: center;
        .icon-yinliang {
          font-size: 20px;
          width: 100px;
          &:hover {
            color: slateblue;
          }
        }
        span {
          flex: 1;
          position: relative;
          &:hover {
            color: slateblue;
              i {
                &.small-tip {
                  display: block;
                }
              }
          }
          i {
            &.small-tip {
              position: absolute;
              left: -14px;
              bottom: -23px;
              font-size: 12px;
              background: rgba(0, 0, 0, 0.2);
              border: 1px solid #f5f5f5;
              color: #fff;
              padding: 4px 10px;
              display: none;
            }
          }
          font-size: 24px;
          &.icon-yinle8 {
            font-size: 30px;
          }
        }
      }
    }
  }
  // 歌曲列表
  .menu-warp {
    width: 400px;
    height: 80%;
    background: rgba(0,0,0,0.6);
    box-shadow: 10px 20px 3px #f7f7f7;
    padding: 20px;
    position: fixed;
    right: 10px;
    bottom: 100px;
    z-index: 100;
    overflow-y: auto;
    color: #fff;
    .menu-item {
      height: 24px;
      line-height: 24px;
      margin-bottom: 10px;
      overflow: hidden;
      &.active {
        color: blueviolet;
      }
      
    }

  }
}
</style>