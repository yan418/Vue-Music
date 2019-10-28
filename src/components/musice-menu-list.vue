<template>
  <div class="musiclist">
    
      <ul class="list" v-loading="loadingin">
        <router-link tag="li" :to="{name:'MusicLyric',params:{songId:item.song_id}}" class="song" v-for="(item,index) in musicList" :key="index">
           <div class="poster">
              <img :src="item.album_500_500">
           </div>
           <div class="info">
                <div class="name">{{item.title}}</div>
                <div class="author">{{item.author}}</div>
           </div>
         </router-link>
      </ul>
      <router-link :to="{name:'MusiceMore',params:{id:musicParam.type}}"  class="more-songs" v-if="showMore" tag="div">查看该榜单</router-link>
    </div>
</template>

<script>
  // 歌曲菜单接口地址：http://tingapi.ting.baidu.com/v1/restserver/ting
  // 参数列表
  // 例：method=baidu.ting.billboard.billList&type=1&size=10&offset=0
  // 参数：musicType = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
  // size = 10 //返回条目数量
  // offset = 0 //获取偏移

  // 歌手歌曲接口地址：/v1/restserver/ting?
  // 参数列表
  // 例：method=baidu.ting.artist.getSongList&tinguid="+ 歌手id +"&limits= 条数 &use_cluster=1&order=2"
  // 歌手id : 2517 132632388 1117 1094 1067 821050

  export default {
      name:"musice-menu-list",
      data(){
        return{
          musicUrl:{
             type:1,
             size:5,
             offset:0
          },
          musicList:[],
          loadingin: true
        }
      },
      props:{
        musicParam:Object
      },
      methods:{
          //歌曲菜单网络请求
          httpsMusicList(){
            let type=this.musicParam.type;
            let size=this.musicParam.size;
            let offset=this.musicParam.offset;
            const url=this.HOST+ `/v1/restserver/ting?method=baidu.ting.billboard.billList&type=${type}&size=${size}&offset=${offset}`;
            this.$axios.get(url)
            .then( res =>{
              this.musicList=res.data.song_list;

               //加载框加载完毕
               this.loadingin=false
            })
            .catch( error =>{
              console.log("请求失败");
            })
          },
          //歌手歌曲网络请求
          httpsSingerList(){
            let id=this.$route.params.id;
            let size=this.musicParam.size;
            const url=this.HOST+ `/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid=${id}&limits=${size}&use_cluster=1&order=2"`;
            this.$axios.get(url)
            .then( res =>{
              this.musicList=res.data.songlist

              //加载框加载完毕
              this.loadingin=false
            })
            .catch( error =>{
              console.log("请求失败");
            })
          }
      },
      computed:{
        showMore(){
          if(this.musicParam.state=="menu"){
            return true
          }
          return false
        }
      },
      //生命周期函数
      created(){
         if(this.musicParam.state=="menu"){
           this.httpsMusicList()
         }else if(this.musicParam.state=="singer"){
           this.httpsSingerList()
         }
      }
  }

</script>

<style scoped="scoped">
  .musiclist{
    background-color: #fff;
    margin-top: 10px;
    padding: 10px 12px;
  }

  .list {
      word-wrap: break-word;
      -webkit-hyphens: auto;
      hyphens: auto;  /*指定当文字跨越多行时如何自动换行断字*/
      word-break: break-all;
      min-height: 330px;
  }

  .list li {
      height: 55px;
      border-bottom: 1px solid #eee;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      padding-bottom: 10px;
  }

  .list li .poster {
      width: 58px;
      margin-right: 12px;
  }

  .list li .poster img {
      border: 1px solid #eee;
      width: 100%;
      height: 100%;
  }

  .list li .info {
      overflow: hidden;
  }

  .list li .info .name {
      overflow: hidden;
      text-overflow: ellipsis;  /*显示...*/
      white-space: nowrap;     /*不换行*/
      font-size: 16px;
      color: #333;
  }

  .list li .info .author {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      color: #999;
      margin-top: 2px;
  }
  .more-songs{
    color: #999;
    margin-top: 9px;
    font-size: 12px;
    text-align: center;
    height: 32px;
    line-height: 32px;
  }
</style>
