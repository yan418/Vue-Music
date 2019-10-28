<template>

  <div class="searchlist">
      <div class="panel hotsongs" >
        <ul class="list">
          <router-link :key="index" :to="{name:'MusicLyric',params:{songId:item.songid}}" tag="li" class="song" v-for="(item,index) in musicList">
            <div class="info">
                <div class="name">{{ item.songname }}</div>
                <div class="author">{{ item.artistname }}</div>
            </div>
          </router-link>
        </ul>
      </div>
  </div>


</template>

<script>
  // 一、请求搜索列表列表   /v1/restserver/ting
  // 例：method=baidu.ting.search.catalogSug&query="+this.content

  export default {
    name:"searchlist",
    data(){
      return{
        musicList:[]
      }
    },
    props:{
      content:{
        type:String,
        default:""
      }
    },
    methods:{
      //搜索请求
      httpsSearch(){
        let url= this.HOST + "/v1/restserver/ting?method=baidu.ting.search.catalogSug&query="+this.content;
        this.$axios.get(url)
        .then( res=>{
           //console.log("请求"+this.content)
           this.musicList=res.data.song;
        })
        .catch( error=>{
           console.log("请求失败");
        })
      }
    },
    mounted(){
      this.httpsSearch()
    },
    updated(){
      //更新完成状态
     this.httpsSearch()
    }
  }
</script>

<style scoped="scoped">

.searchlist{
  background-color: #fff;
  margin-top: 10px;
  padding: 10px 17px;
  padding-top: 0;
}

.layout.home .mod-lists .panel {
    border-top: 1px solid #eee;
    position: relative;
    top: -1px;
    display: none;
}

.list {
    word-wrap: break-word;
    -webkit-hyphens: auto;
    hyphens: auto;
    word-break: break-all;
}

.panel .list li {
    height: 55px;
    border-bottom: 1px solid #eee;
    padding-left: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}

.list li.song {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    min-height: 55px;
    text-align: left;
    margin-top: 10px;
}

.panel .list li .poster {
    position: relative;
    width: 45px;
    margin-right: 8px;
}

.panel .list li .poster img {
    border: 1px solid #eee;
}

.list li .info {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.panel .list li .info .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    color: #333;
}
</style>
