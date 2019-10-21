<template>
  <MenuList :musicParam="musicParam"></MenuList>
</template>

<script>

 import MenuList from '@/components/musice-menu-list'

 export default {
    name:"king",
    data(){
      return{
         musicParam:{
           type:"11",
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
