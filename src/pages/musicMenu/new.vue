<template>
   <MenuList :musicParam="musicParam"></MenuList>
</template>

<script>
  import MenuList from '@/components/musice-menu-list'

  export default {
    name:"new",
    data(){
      return{
         musicParam:{
           type:"1",
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
