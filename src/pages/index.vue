<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <div class="xw" >
        <input type="search" class="y0 homeShow" placeholder="搜索你喜欢的音乐" v-model="searchdata" >
        <router-link :to="{name:'Search',params:{val:searchdata}}" tag="span" class="y5" >搜索 </router-link>
      </div>
    </div>
    <SwiperSlider />
    <MusicMenu></MusicMenu>
    <router-view></router-view>

    <MusicHot></MusicHot>


  </div>
</template>

<script>

  import MusicMenu from "./music-menu"
  import MusicHot from "./music-hot"
  import SwiperSlider from '@/components/swiper-slider.vue'

  export default {
    name:"index",
    data(){
      return{
        searchdata:""
      }
    },
    components:{
      MusicMenu,
      MusicHot,
      SwiperSlider
    }
  }

</script>

<style scoped="scoped">
.xw {
      height: 44px;
      line-height: 44px;
      background-color: #fff;
      color: #555;
      font-size: 17px;
      transform: translateZ(0);
      display: flex;
      flex-direction: row;
      align-items:center;
  }
  .y0 {
      outline: none;
      background: transparent;
      border: 1px solid #999;
      font-size: 14px;
      height: 28px;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 70%;
      text-indent: 8px;
  }
  .y5 {
      position: absolute;
      right: 13px;
      top: 8px;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      background-color: #e5e5e5;
      -webkit-border-radius: 3px;
      -ms-border-radius: 3px;
      border-radius: 3px;
      color: #333333;
      font-size: 14px;
      box-sizing: border-box;
      padding: 0px 14px;
  }

  .homeShow{
    width: 76%;
    margin-left: 15px;
  }

</style>
