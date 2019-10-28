<template>
  <div class="search">
    <div class="xw" >
      <router-link to="/" class="y1"  >首页 </router-link>
      <input type="search" class="y0" placeholder="搜索你喜欢的音乐" v-model="searchdata" >
      <span  class="y5" >搜索 </span>
    </div>

    <!-- 搜索列表 -->
    <div class="mod-songlists" >
          <div class="container">
            <SearchList :content="searchdata"></SearchList>
          </div>
    </div>

  </div>
</template>

<script>


  import SearchList from '@/components/search-list'

  export default {
    name:"search",
    data(){
      return{
        searchdata:this.$route.params.val
      }
    },
    components:{
      SearchList
    },
    methods:{

    }
  }

</script>

<style scoped="scoped">
  .xw {
      height: 44px;
      line-height: 44px;
      background-color: #fff;
      color: #555;
      font-size: 17px;
      transform: translateZ(0);
      display: flex;
      flex-direction: row;
      align-items:center;
  }
  .y1 {
    font-size: 14px;
    width: 40px;
    padding-left: 8px;
  }
  .y0 {
      outline: none;
      background: transparent;
      border: 1px solid #999;
      font-size: 14px;
      height: 28px;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 70%;
      text-indent: 8px;
  }
  .y5 {
      position: absolute;
      right: 13px;
      top: 8px;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      background-color: #e5e5e5;
      -webkit-border-radius: 3px;
      -ms-border-radius: 3px;
      border-radius: 3px;
      color: #333333;
      font-size: 14px;
      box-sizing: border-box;
      padding: 0px 14px;
  }

  .homeShow{
    width: 76%;
    margin-left: 15px;
  }
</style>
