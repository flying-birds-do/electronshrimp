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
        <li>
          <span class="iconfont icon-tubiaozhizuomobanyihuifu-"></span>
          <p>每日30首</p>
        </li>
        <li>
           <span class="iconfont icon-yiliao"></span>
          <p>听见不同</p>
        </li>
        <li>
          <span class="iconfont icon-bofang3"></span>
          <p>猜你喜欢</p>
        </li>
        <li>
        <span class="iconfont icon-paihangbang"></span>
          <p>私人电台</p>
        </li>
      </ul>
    </div>
    <div class="remond-music">
      <h2>推荐歌单</h2>
      <music-list></music-list>
    </div>
    <div class="remond-music">
      <h2>
        <p>AI推荐</p>
        <span class="total">全部 ></span>
      </h2>
      <music-list></music-list>
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
      ]
    };
  },
  components: {
    musicList
  }
};
</script>
<style scoped lang="scss">
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