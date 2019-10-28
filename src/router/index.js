import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'


import Hot from '@/pages/musicMenu/hot'
import News from '@/pages/musicMenu/new'
import King from '@/pages/musicMenu/king'
import MusicList from '@/pages/music-list'
import MusicLyric from '@/pages/music-lyric'
import Search from '@/pages/search'
import MusiceMore from '@/pages/musice-more'

Vue.use(Router)

export default new Router({
  linkActiveClass:"active",  //高亮设置
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect:"/hot",
      children:[
        {
          path: 'hot',
          name: 'Hot',
          component: Hot,
        },
        {
          path: 'new',
          name: 'News',
          component: News,
        },
        {
          path: 'king',
          name: 'King',
          component: King,
        }
      ]
    },
    {
      path: '/list:id',
      name: 'MusicList',
      component: MusicList,
    },
    {
      path: '/lyric:songId',
      name: 'MusicLyric',
      component: MusicLyric,
    },
    {
      path: '/search:val',
      name: 'Search',
      component: Search,
    },
    {
      path: '/more:id',
      name: 'MusiceMore',
      component: MusiceMore,
    }
  ]
})
