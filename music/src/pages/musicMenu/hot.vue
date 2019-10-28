<template>
  <MenuList :musicParam="musicParam"></MenuList>
</template>

<script>
  // 一、获取列表
  // 例：method=baidu.ting.billboard.billList&type=1&size=10&offset=0
  // 参数：musicType = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
  // size = 10 //返回条目数量
  // offset = 0 //获取偏移

  import MenuList from '@/components/musice-menu-list'

  export default {
    name:"hot",
    data(){
      return{
         musicParam:{
           type:"2",
           size:5,
           offset:0,
           state:"menu"
         }
      }
    },
    components:{
      MenuList
    }
  }

</script>

<style>
</style>
