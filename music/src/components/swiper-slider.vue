<template>
  <div>
     <!-- 轮播图 -->
      <swiper :options="swiperOption" ref="mySwiper" >
          <!-- slides -->
          <swiper-slide v-for="(item,index) in imgData" :key="index">
            <img :src="item" />
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>

  </div>

</template>

<script>

  export default {
    name:"SwiperSlider",
    data(){
      return{
         //swiper 轮播图
         swiperOption: {
            pagination: {
               el: '.swiper-pagination',
            },
            loop:true,
            autoplay: {
              delay: 5000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
            },
         },
         imgData:[
           "http://business.cdn.qianqian.com/qianqian/pic/bos_client_15716260099678f4e6840b7aedd945dcb29107f675.jpg@s_2,w_750,h_300",
           "http://business.cdn.qianqian.com/qianqian/pic/bos_client_1571372924a573dea6bad651f32776dcc15f14f26f.jpg@s_2,w_750,h_300",
           "http://business.cdn.qianqian.com/qianqian/pic/bos_client_1571626746ccb4b5902b595738a0aaab37b8f34e0c.jpg@s_2,w_750,h_300",
           "http://business.cdn.qianqian.com/qianqian/pic/bos_client_15713254357205dabc9bcff231e5937fb2fb1c6d5d.jpg@s_2,w_750,h_300",
           "http://business.cdn.qianqian.com/qianqian/pic/bos_client_1571397349d70da5d098909b0232aa5a215fe7690d.jpg@s_2,w_750,h_300"
         ]
      }
    }
  }

</script>

<style >
  .swiper-pagination-bullet-active{
    background: red;
  }
</style>
