<template>
  <section class="music-list-warp">
    <ul>
      <li v-for="(item,index) in 10" :key="index">
        <div class="single-box">
          <span class="play-mount">178.3万</span>
          <img src="@/assets/images/logo.jpg" alt class="music-bg" />
        </div>
        <p>90后的回忆</p>
        <span class="col-grey">小夏</span>
      </li>
    </ul>
  </section>
</template>
<style  lang="scss" scoped>
.music-list-warp {
    padding: 30px ;
  ul {
      display: flex;
      flex-wrap: wrap;
    li {
        width: 180px;
        margin-right: 50px;
      .single-box {
        position: relative;
        .play-mount {
          position: absolute;
          right: 10px;
          top: 5px;
          z-index: 30;
          padding: 0 10px;
          line-height: 24px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          border-radius: 4px;
          &::after {
              position: absolute;
              right: -8px;
              top:50%;
              transform: translateY(-50%);
              content: '';
               width:0;
                height:0;
                overflow:hidden;
                font-size: 0;     /*是因为, 虽然宽高度为0, 但在IE6下会具有默认的 */
                line-height: 0;  /* 字体大小和行高, 导致盒子呈现被撑开的长矩形 */
                border-width:4px;
                border-style:solid dashed dashed dashed;/*IE6下, 设置余下三条边的border-style为dashed,即可达到透明的效果*/
                border-color:transparent transparent transparent rgba(0, 0, 0, 0.6) ;
          }
        }
        
        .music-bg {
          width: 160px;
          height: 160px;
        }
      }
      p {
          margin-top: 10px;
          font-size: 14px;
          line-height: 14px;
      }
      .col-grey {
            font-size: 12px;
            color: #9c9c9c;
        }
    }
  }
}
</style>