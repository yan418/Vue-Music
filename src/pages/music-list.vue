<template>
  <div class="mod-songlists">
      <div class="hd">
          <h2><router-link to="/hot" tag="span"><    </router-link>  歌手歌曲</h2>
      </div>
      <div>
      </div>
      <div class="container">
         <MenuList :musicParam="musicParam"></MenuList>
      </div>
  </div>
</template>

<script>
  // 一、请求歌手歌曲列表   /v1/restserver/ting
  // 例：method=baidu.ting.artist.getInfo&tinguid="+ 歌手id


  import MenuList from '@/components/musice-menu-list'

  export default {
    name:"hot",
    data(){
      return{
         musicParam:{
           type:"0",
           size:20,
           offset:0,
           state:"singer"
         }
      }
    },
    components:{
      MenuList
    }
  }
</script>

<style scoped="scoped">
  .mod-songlists {
      background-color: #fff;
      padding: 10px 0px;
  }

  .hd {
      margin: 14px 0 18px 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
  }

  .hd h2 {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      margin: 0;
      padding: 0;
      font-size: 20px;
      margin-left: 15px;
  }

</style>
