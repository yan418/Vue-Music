<template>
  <div class="mod-songlists" >
       <div class="hd">
           <h2><router-link :to="routeritem" tag="span"><   </router-link>  更多列表</h2>
       </div>

       <div class="container" v-loading.fullscreen.lock="loadingin"
                              element-loading-text="加载中"
                              element-loading-spinner="el-icon-loading"
                              element-loading-background="rgba(0, 0, 0, 0.8)">

         <div class="musiclist">
  		      <!-- 框架文档：https://github.com/bedlate/vue-data-loading/blob/master/README_CN.md
                 npm install vue-data-loading --save
            -->
           <vue-data-loading :loading="loading" :completed="completed" :listens="['pull-down', 'pull-up']"  @pull-up="pullUp" @pull-down="pullDown">
               <ul class="list" >
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
            </vue-data-loading>
          </div>
       </div>
  </div>

</template>

<script>

  import VueDataLoading from 'vue-data-loading'
  export default {
    name:"musiceMore",
    data(){
      return{
        musicUrl:{
        			type:this.$route.params.id,
        			size:20,
        			offset:0
        },
        musicList:[],
        loading: false,
        completed: false,
        loadingin: true
      }
    },
    components: {
        VueDataLoading
    },
    computed:{
       routeritem(){
          // 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
          switch(this.musicUrl.type){
            case "1":
               return "/new"
               break;
            case "2":
              return "/hot"
              break;
            case "11":
               return "/king"
               break;
          }
       }
    },
    methods:{
    		//歌曲菜单网络请求
    		httpsMusicList(){
    	    //为true才加载数据
          this.loading=true;
    		  let type=this.musicUrl.type;
    		  let size=this.musicUrl.size;
    		  let offset=this.musicUrl.offset;
    		  const url=this.HOST+ `/v1/restserver/ting?method=baidu.ting.billboard.billList&type=${type}&size=${size}&offset=${offset}`;
    		  this.$axios.get(url)
    		  .then( res =>{

    			  if(res.data.song_list){
    				  this.musicList=this.musicList.concat(res.data.song_list);
    				  //this.musicList=res.data.song_list;
    				  console.log(this.musicList);
    			  }else{
    				  console.log("没有数据了");
    			  }
    			  //加载为false，不再加载数据
            this.loading=false;
            this.loadingin=false;
    		  })
    		  .catch( error =>{
    		    console.log("请求失败");
    		  })

    		},
    		pullUp() {
    			//console.log("上拉了")
    			//一次加载20条，偏移量为20
    			this.musicUrl.offset+=20;
    			this.httpsMusicList()
    		},
    		pullDown() {
    			//console.log("下拉了")
    			this.musicList = []
    			this.musicUrl.offset=0;
    			this.completed = false
    			this.httpsMusicList()
    		},

    	},
    	created(){
    	    this.httpsMusicList()
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
</style>
