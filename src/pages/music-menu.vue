<template>
   <div class="bars">
      <router-link to="/hot" tag="div"  class="bar" >热歌榜</router-link>
      <router-link to="/new" tag="div"  class="bar">新歌榜</router-link>
      <router-link to="/king" tag="div" class="bar">King榜</router-link>
   </div>
</template>

<script>
  export default {
    name:"music-menu"
  }
</script>

<style scoped="scoped">
  .bars{
      display: flex;
      flex-direction: row;
   }
   .bars .bar{
        padding: 18px 0 12px 0;
        font-size: 16px;
        flex: 1;
        text-align: center;
        color: #999;
    }
    .active{
      color: red !important;
    }
</style>
