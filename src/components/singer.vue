<template>
  <!-- 歌手信息 -->
  <router-link :to="{name:'MusicList',params:{id:singerId}}" tag="div" class="card" :uid="singerId">
        <div class="card-slider">
            <div class="poster">
                <img :src="singerData.avatar_big" :alt="singerData.name">
            </div>
        </div>
        <div class="info">
            <div class="name">{{ singerData.name }}</div>
        </div>
  </router-link>
</template>

<script>

  // 接口地址：http://tingapi.ting.baidu.com/v1/restserver/ting
  // 参数列表
  // 例：method=baidu.ting.artist.getInfo&tinguid= 歌手id
  // 歌手id : 2517 132632388 1117 1094 1067 821050

  export default {
    name:"singer",
    data(){
      return{
        singerData:{}
      }
    },
    props:{
      singerId:{
        type:String,
        default:"2517"
      }
    },
    methods:{
      httpsSingerData(){
        let id=this.singerId;
        const url=this.HOST+`/v1/restserver/ting?method=baidu.ting.artist.getInfo&tinguid=${id}`;
        this.$axios.get(url)
        .then( res =>{
          //console.log(res);
          this.singerData=res.data
        })
        .catch( error =>{
          console.log("请求失败");
        })
      }
    },
    created(){
      this.httpsSingerData()
    }
  }
</script>

<style scoped="scoped">

  .card {
      width: 33.3%;
      float: left;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0 5px 20px;
  }

  .card-slider {
      border: 1px solid #eee;
  }

  .card .poster {
      position: relative;
      height: 0;
      padding-bottom: 100%;
  }
  img{
    max-width: 100%;
  }
  .card .info {
      font-size: 12px;
      overflow: hidden;
      white-space: normal;
      margin-top: 4px;
      line-height: 14px;
      max-height: 28px;
      margin-bottom: 2px;
  }
</style>
