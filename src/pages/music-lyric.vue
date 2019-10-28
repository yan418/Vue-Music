<template>
  <div class="play">
  		<div class="header">
  			<div class="title">
          <router-link to="/">首页</router-link>
  				<div class="music-info">
  					<p>{{songinfo.title}}</p>
  					<p>{{songinfo.author}}</p>
  				</div>
  				<router-link :to="{name:'Search',params:{val:''}}">搜索</router-link>
  			</div>
  		</div>
  		<div class="song-info">
  			<div class="song-info-img">
  				<img :src="songinfo.pic_big">
  				<div class="song-lrc">

             <!-- 歌词 -->
             <Lyric :songId="$route.params.songId" :currentTime="currentTime" :durationTime="durationTime" :playState="playState"></Lyric>

  				</div>
  			</div>
  			<div class="iconbox">
  				<i class="iconfont icon-shoucang2 left" @click="collect">{{collectData.name}}</i>
  				<i class="box"></i>
  				<i class="iconfont icon-xiazai right">下载</i>
  			</div>
  		</div>

  		<div class="song">
        <audio :src="bitrate.file_link"  controls ref="player" ></audio>
  		</div>
  	</div>
</template>

<script>

  // 歌曲详情接口地址：http://tingapi.ting.baidu.com/v1/restserver/ting
  // 参数列表
  // 例：method=baidu.ting.song.play&songid= 歌曲id

  import Lyric from '@/components/lyric'

  export default {
    name:"lyric",
    data(){
      return{
        songinfo:{},
        bitrate:{},
        collectData:{
          name:"收藏",
          state:true
        },
        currentTime:null,  // 当前播放时间
        durationTime:null, // 整体时间
        playState :false , // 音乐播放状态

      }
    },
    components:{
      Lyric
    },
    methods:{
      httpsSongData(){
         //歌曲的网络请求
         let id=this.$route.params.songId;
         let url=this.HOST+"/v1/restserver/ting?method=baidu.ting.song.play&songid="+id;
         this.$axios.get(url)
         .then(res =>{
           this.songinfo=res.data.songinfo;
           this.bitrate=res.data.bitrate;
           //请求歌词
           //this.httpsLyricData()
         })
         .catch(error =>{
            console.log("请求失败")
         })
      },
      collect(){
         //收藏
         if(this.collectData.state==true){
            this.collectData.name="已收藏";
            this.collectData.state=false;
         }else{
           this.collectData.name="收藏";
           this.collectData.state=true;
         }
      },
      monitorAudio(){
         //监听audio
         //当前的播放位置发送改变时触发
         this.$refs.player.addEventListener("timeupdate",(res)=>{
            //audio标签提供的获取当前播放时间的方法
            this.currentTime=this.$refs.player.currentTime;
         })
         //监听准备开始播放时执行
         this.$refs.player.addEventListener("canplay",(res)=>{
            //audio标签提供的获得歌曲播放整体时间的方法
            this.durationTime=this.$refs.player.duration;
         })
         //监听音乐是否播放
         this.$refs.player.addEventListener("playing", function(){
              console.log("播放音乐");
              // this.playState=true;

              // this.$nextTick(() => {
              //        console.log(4445)
              //     document.querySelector(".lrcContainer").scrollTop+=200;
              // });

         })
         //监听音乐是否暂停
         this.$refs.player.addEventListener("pause", function(){ //暂停状态Doing
              this.playState=false;
         });


      },
      NoAudio(){
          //取消监听audio
          //当前的播放位置发送改变时触发
          this.$refs.player.removeEventListener("timeupdate",(res)=>{
             //audio标签提供的获取当前播放时间的方法
             this.currentTime=this.$refs.player.currentTime;
          })
          //监听准备开始播放时执行
          this.$refs.player.removeEventListener("canplay",(res)=>{
             //audio标签提供的获得歌曲播放整体时间的方法
             this.durationTime=this.$refs.player.duration;
          })
       },


    },
    mounted() {
      //组件挂载结束
      this.monitorAudio()
    },
    beforeDestroy(){
       //实例被销毁
       this.NoAudio()
    },
    created(){
      this.httpsSongData()
    }
  }

</script>

<style scoped="scoped">
  .header{
  	padding:15px;
  }

  .music-info{
  	flex: 1;
  	font-size: 20px;
  }

  .title{
  	display: flex;
  	text-align: center;
  }

  .left{
  	font-size: 30px;
  }

  .right{
  	font-size: 30px;
  }

  .song-info{
  	padding: 15px;
  }

  .song-info-img{
  	text-align: center;
  }

  .song-info-img img{
  	width: 50%;
  	border-radius: 5px;
  	box-shadow: 0 0 10px 0 rgba(50,50,50,.31);
  }

  .song-lrc{
  	margin-top: 10px;
    min-height: 50px;
  }

  .iconbox{
  	display: flex;
  	margin-top: 30px;
  }

  .iconbox .box{
  	flex: 1;
  }

  .song{
  	width: 100%;
  	text-align: center;
  }

  .song audio{
  	width: 80%;
  }





  /* 歌词 */
 /* .lrcContainer{
    overflow:hidden;
    height: 200px;
    width: 100%;
  }
  .lrc{
  	width: 100%;
    top: 0;
  }
  .activeShow{
  	display: block;
    color: #FF0000;
  }
  .lrc-p{
    height: 30px;
  	line-height: 30px;
  }

  .up30{
  	margin-top: -30px;
  } */
</style>
