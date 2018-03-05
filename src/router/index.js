import Vue from 'vue'
import Router from 'vue-router'
import foundMusicSession from '@/components/foundMusic-session/session'
import foundMusicIndex from '@/components/foundMusic-session/index'
import foundMusicRankingList from '@/components/foundMusic-session/rankinglist'
import foundMusicSongSheel from '@/components/foundMusic-session/songSheel'
import foundMusicSingerList from '@/components/foundMusic-session/singerList'
import foundMusicDiskShelves from '@/components/foundMusic-session/diskShelves'
import MyMusic from '@/components/myMusic/myMusic'
import MyFriends from '@/components/myFriends/myFriends'
import setting from '@/components/userTool/setting/setTool'
import UserMessage from '@/components/userTool/myMessage/myMessageTool'
import UserLevel from '@/components/userTool/myLevel/userLevel'
import UserIndex from '@/components/userTool/myIndex/userIndex'
import Search from '@/components/search/search'
import onceDisk from '@/components/foundMusic-session//detailed/onceDisk'
import onceSinger from '@/components/foundMusic-session/detailed/onceSinger'
import onceSongSheel from '@/components/foundMusic-session/detailed/onceSongSheel'
import onceMusic from '@/components/foundMusic-session/detailed/onceMusic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: '',
      component: foundMusicSession,
      children:[
          {
            path: '',
            name: 'foundMusicIndex',
            component: foundMusicIndex
          },
          {
            path: '/index',
            name: 'foundMusicIndex1',
            component: foundMusicIndex
          },
          {
            path: '/rankinglist',
            name: 'foundMusicRankingList',
            component: foundMusicRankingList
          },
          {
            path:"/songsheel",
            name:"foundMusicSongSheel",
            component:foundMusicSongSheel
          },
          {
            path:"/singerlist",
            name:"foundMusicSingerList",
            component:foundMusicSingerList
          },
          {
            path:"/diskshelves",
            name:"foundMusicDiskShelves",
            component:foundMusicDiskShelves
          },
          {
            path:"/detailedDisk",
            name:"onceDisk",
            component:onceDisk
          },
          {
            path:"/detailedMusic",
            name:"onceMusic",
            component:onceMusic
          },
          {
            path:"/detailedSinger",
            name:"onceSinger",
            component:onceSinger
          },
          {
            path:"/detailedSongSheel",
            name:"onceSongSheel",
            component:onceSongSheel
          }
      ]
    },
    {
      path: '/myMusic',
      name: 'MyMusic',
      component: MyMusic,
    },
    {
      path: '/myFriends',
      name: 'MyFriends',
      component: MyFriends,
    },
    {
      path:"/mySetting",
      name:"UserSetting",
      component:setting
    },
    {
      path:"/myMessages",
      name:"myMessages",
      component:UserMessage
    },
    {
      path:"/myLevel",
      name:"myLevel",
      component:UserLevel
    },
    {
      path:"/myIndex",
      name:"myIndex",
      component:UserIndex
    },
    {
      path:"/search",
      name:"search",
      component:Search
    },
    {
      path: '*',
      name: 'NotFound',
      component: {
        template:`
          <div class="alert alert-danger" style="position: fixed;top:50px;width: 100%;height:120px">
              <h1>404 Page is not found</h1>
          </div>
        `
      }
    }
  ]
})
