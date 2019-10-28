<template>
  <div>
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
    components:{
      MusicMenu,
      MusicHot,
      SwiperSlider
    },
    methods:{

    },
    created(){

    },
  }

</script>

<style>

</style>
