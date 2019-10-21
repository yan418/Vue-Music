<template>
  <div >
    <div class="lrcContainer" ref="lrcId">
       <div class="lrc" >
       {{getAllKey}}
        <!-- <p class="lrc-p" v-show="key < currentTime && key > currentTime - (keyArr[index+1] - keyArr[index])" v-for="(item,key,index) in lrcData">{{ item }}</p> -->
        <!-- lrc文件中的时间与播放获得时间对应的比对关系 -->
        <p class="lrc-p" :class="highlightCom(val,key,index)"  v-for="(val,key,index) in lrcData" :key="index" >{{val}}</p>
        <!-- <p class="lrc-p" v-show="showLyric(val,key,index)"  v-for="(val,key,index) in lrcData" :key="index" >{{val}}---{{key}}</p> -->
       </div>
    </div>
  </div>
</template>

<script>

  // 歌曲歌词详情接口地址：http://tingapi.ting.baidu.com/v1/restserver/ting
  // 参数列表
  // 例：method=baidu.ting.song.lry&songid="+this.songid 歌曲id

  export default {
    name:"Lyric",
    data(){
      return{
        lrcData:{},
        highlight:false,
        keyArr:[],
        lrcOffset:0
      }
    },
    props:{
      songId:{
        type:String
      },
      currentTime:{
        type:Number,
        default:0
      },
      durationTime:Number,
      playState:Boolean
    },
    methods:{
      //歌词部分
      httpsLyricData(){
         //歌曲的网络请求
         let id=this.songId;
         let url=this.HOST+"/v1/restserver/ting?method=baidu.ting.song.lry&songid="+this.songId;
         this.$axios.get(url)
         .then(res =>{
           let lrc=res.data.lrcContent;
           this.analyLuric(lrc)
            //console.log(lrc)
         })
         .catch(error =>{
            console.log("请求失败")
         })
      },
      analyLuric(lrc){
        //解析歌词
        lrc=lrc.split("\n");
        var lrcObj = {};
       // let offset=0;
        for(let i=0;i<lrc.length;i++){

            var lyric = decodeURIComponent(lrc[i]);   //对汉字进行解码
            var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
            var timeRegExpArr = lyric.match(timeReg);
            if(!timeRegExpArr)continue;              //截出时间部分
            //console.log(timeRegExpArr)   ["[00:02.27]"]
            var clause = lyric.replace(timeReg,'');  //截出歌词部分
            for(var k = 0,h = timeRegExpArr.length;k < h;k++){
                var t = timeRegExpArr[k];  // [00:02.27]
                var min = Number(
                       String(t.match(/\[\d*/i)).slice(1)),
                       sec = Number(String(t.match(/\:\d*/i)).slice(1))
                var time = min * 60 + sec;
                lrcObj[time] = clause;
            }

        }
        this.lrcData = lrcObj;
         /**
         {
           "100"："我是歌词",
           "103":"我是歌词2"
         }
         */
      },
      lyScroll(){
          // 歌词滚动
          this.$nextTick(() => {
              this.$refs.lrcId.scrollTop=20;
          });
      },

    },
    computed:{
      // 取出所有的key
      getAllKey(){
        for(let key in this.lrcData){
           this.keyArr.push(key);
        }
      },
      // 显示歌词，播放当前歌词，歌词变红
      highlightCom(){
        return function(val,key,index){
           //显示歌词，
           let nowTime=this.currentTime;  //当前的时间
           if(nowTime){
             //console.log(nowTime)
             if(nowTime>key && nowTime < this.keyArr[index+1]){
                //当滚动当前歌词，向下滚动
                let newLyric=this.lrcData[this.keyArr[index]];
                if(index>4){
                   var activeLyric=document.querySelector(".activeShow").innerHTML;
                   if(newLyric!=activeLyric){
                     this.lrcOffset+=35;
                     document.querySelector(".lrc").style.marginTop=`-${this.lrcOffset}px`
                   }
                }
                return "activeShow"
             }else{
                return ""
             }
           }
        }
      },
      showLyric(){
        //显示当前歌词
        return function(val,key,index){
         //显示歌词，
         let nowTime=this.currentTime;  //当前的时间
         if(nowTime>key && nowTime < this.keyArr[index+1]){
            return true
         }else{
            return false
         }
        }
      },
    },
    created(){
      this.httpsLyricData()
    },


  }
</script>

<style scoped="scoped">
  /* 歌词 */
  .lrcContainer{
/*    overflow: scroll; */
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
  }
</style>
