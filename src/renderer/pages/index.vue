<template>
  <section class="find-music-warp">
    <div class="default-bottom-content">
      <div class="banner">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item,index) in bannerList" :key="index">
            <h3 class="medium">
              <img :src="item.url" alt />
            </h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="find-music-menu-list">
      <ul>
        <li @click="playFavoiteMusic">
          <span class="iconfont icon-tubiaozhizuomobanyihuifu-"></span>
          <p>每日30首</p>
        </li>
        <li @click="playFavoiteMusic">
          <span class="iconfont icon-yiliao"></span>
          <p>听见不同</p>
        </li>
        <li @click="playFavoiteMusic">
          <span class="iconfont icon-bofang3"></span>
          <p>猜你喜欢</p>
        </li>
        <li @click="playFavoiteMusic">
          <span class="iconfont icon-paihangbang"></span>
          <p>私人电台</p>
        </li>
      </ul>
    </div>
    <div class="remond-music">
      <h2>推荐歌单</h2>
      <music-list @playCurrentMusic="playCurrentMusic" :musicName="$store.state.Counter.musiclist"></music-list>
    </div>
    <div class="remond-music">
      <h2>
        <p>AI推荐</p>
        <span class="total">全部 ></span>
      </h2>
      <music-list @playCurrentMusic="playCurrentMusic" :musicName="$store.state.Counter.musiclist"></music-list>
    </div>
    <div class="remond-music">
      <h2>
        <p>推荐艺人</p>
        <span class="total">全部 ></span>
      </h2>
      <ul class="remond-people">
        <li v-for="(item,index) in 5" :key="index">
          <img src="@/assets/images/logo.jpg" alt class="people-img" />
          <p>梁静茹</p>
          <span class="tag">#国语流行Manddarin Pop</span>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import musicList from "@/components/common/music-list";
import { music } from "@/music-data.js";
const fs = require('fs');
export default {
  data() {
    return {
      bannerList: [
        {
          url: require("@/assets/images/1.jpg")
        },
        {
          url: require("@/assets/images/2.jpg")
        },
        {
          url: require("@/assets/images/3.jpg")
        },
        {
          url: require("@/assets/images/4.jpg")
        },
        {
          url: require("@/assets/images/5.jpg")
        },
        {
          url: require("@/assets/images/6.jpg")
        },
        {
          url: require("@/assets/images/7.jpg")
        },
        {
          url: require("@/assets/images/9.jpg")
        }
      ],
      musicData: [],
      musicName: [],
      musicWords:[],
      randomSelf: ""
    };
  },
  mounted() {
    this.musicData = music.musicListData;
    this.musicWords = music.musicWordData;
  },
  components: {
    musicList
  },
  methods: {
    // 点击每日30 听见不同 猜你喜欢 私人电台
    playFavoiteMusic() {
      this.$parent.randomPlayMusic()
    },
    playCurrentMusic(item) {
      // this.$emit("playCurrentMusic", item);
      let musiclist =  JSON.parse(JSON.stringify(this.$store.state.Counter.musiclist))
      let idx = 0;
      let index = musiclist.filter(item1 => {
        idx = item.id;
        return item1.id == item.id;
      });
      for (let i = 0; i < musiclist.length; i++) {
        musiclist.suired = false;
      }
      if (index.length > 0) {
        let changeVal = JSON.parse(JSON.stringify(item));
        // let changemusiclist = JSON.parse(
        //   JSON.stringify(this.$store.state.Counter.musiclist)
        // );
        musiclist[idx] = changeVal;
        changeVal.suired = !changeVal.suired;
        this.$store.dispatch("submitCurrentPath", changeVal);
        this.$store.dispatch("musicListState", musiclist);
      } else {
        this.$store.dispatch(
          "submitCurrentPath",
          this.$store.state.Counter.musiclist[0]
        );
      }
      this.$parent.playProcess();
    },
    randomname(name, words) {
      const xing = name.split("");
      this.randomSelf =
        xing[Math.floor(Math.random() * xing.length)] +
        words[Math.floor(Math.random() * words.length)];
      return this.randomSelf;
    },
    // 获取歌词
    getmusicWords () {
      // 读取歌词文件内容
      for(let i=0;i<this.musicWords.length;i++) {
        let path = require("@/assets/musicword/" + this.musicWords[i]);
          fs.readFile(path,function(err,data){
            if(err){
                return console.log(err);
            }
                console.log("我是异步执行的结果集："+data.toString());
            });
      }
      
    },
    // 截取歌名 去掉.mp3
    sbuStrMusicName(musicList, musicImgData) {
      let musicName = [];
      let nameStr = `赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阴鬱胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦卻璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庾终暨居衡步都耿满弘匡国文寇广禄阙东欧殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查后荆红游竺权逯盖益桓公万俟司马上官欧阳夏侯诸葛闻人东方赫连皇甫尉迟公羊澹台公冶宗政濮阳淳于单于太叔申屠公孙仲孙轩辕令狐钟离宇文长孙慕容鲜于闾丘司徒司空丌官司寇仉督子车颛孙端木巫马公西漆雕乐正壤驷公良拓跋夹谷宰父谷梁晋楚闫法汝鄢涂钦段干百里东郭南门呼延归海羊舌微生岳帅缑亢况郈有琴梁丘左丘东门西门商牟佘佴伯赏南宫墨哈谯笪年爱阳佟第五言福`;
      let langulage = [
        "春暖花开",
        "十字路口",
        "千军万马",
        "白手起家",
        "张灯结彩",
        "风和日丽",
        "万里长城",
        "人来人往",
        "自由自在",
        "瓜田李下",
        "助人为乐",
        "红男绿女",
        "春风化雨",
        "马到成功",
        "拔苗助长",
        "安居乐业",
        "走马观花",
        "念念不忘",
        "落花流水",
        "一往无前",
        "落地生根",
        "天罗地网",
        "东山再起",
        "一事无成",
        "山清水秀",
        "语重心",
        "别有洞天",
        "水深火热",
        "鸟语花香",
        "自以为是"
      ];
      for (let i = 0; i < musicList.length; i++) {
        let musicObj = {};
        if (musicList[i].indexOf(".mp3") > -1) {
          musicObj["name"] = musicList[i].slice(0, musicList[i].length - 4);
          musicObj["path"] = require("@/assets/music/" + musicList[i]);
          musicObj["mount"] = Math.floor(Math.random() * 100000);
          musicObj["id"] = i;
          musicObj["suired"] = false;
          musicObj["autor"] = this.randomname(nameStr, langulage);
          musicObj["urlimage"] = require("@/assets/images/" +
            musicImgData[Math.floor(Math.random() * musicImgData.length)]);
          musicName.push(musicObj);
        }
      }
      this.$store.dispatch("musicListState", musicName);
      // this.musicName = musicName;
    }
  },
  computed: {},
  watch: {
    musicData(oldValue, newValue) {
      this.sbuStrMusicName(music.musicListData, music.musicImgData);
    },
    // musicWords () {
    //   this.getmusicWords(music.musicWordData)
    // }
  }
};
</script>
<style scoped lang="scss">
.medium img {
  width: 100%;
}
.default-bottom-content {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  .banner {
    height: 240px;
    width: 100%;
    img {
      height: 100%;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .asynic-content {
    background: blue;
    width: 100%;
    flex: 1;
  }
}
.find-music-menu-list {
  padding-top: 40px;
  ul {
    display: flex;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #9c9c9c;
      .iconfont {
        font-size: 50px;
        color: slateblue;
      }
      // img {
      //   width: 60px;
      //   height: 60px;
      //   display: inline-block;
      // }
      p {
        margin-top: 10px;
        flex: 1;
      }
    }
  }
}
.remond-music {
  h2 {
    padding-top: 30px;
    padding-left: 30px;
    font-size: 18px;
    color: #000;
    font-weight: bold;
    display: flex;
    p {
      flex: 1;
    }
    .total {
      font-size: 12px;
      color: #9c9c9c;
    }
  }
  .remond-people {
    display: flex;
    margin-top: 30px;
    padding-bottom: 60px;
    li {
      height: 215px;
      width: 25%;
      .people-img {
        width: 150px;
        border-radius: 50%;
      }
      p {
        font-size: 16px;
        color: #333;
      }
      .tag {
        font-size: 12px;
        color: #9c9c9c;
      }
    }
  }
}
</style>