import Vue from 'vue'
import Router from 'vue-router'
import MyDemo from '@/components/myDemo'
import HomePage from '@/components/Home'

Vue.use(Router)

export default new Router({
 // mode:'history',   //使用history，網址列換頁不會有/#/
  routes: [
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage 
    },  
    {
      path: '/Home',
      name: 'Home',
      component: MyDemo 
    },
    // 當 url path 不符合 router 表的時候，預設轉址到
    // 順序一定要最後面
    { path: '/*', redirect: '/Home' } 
  ]
})

