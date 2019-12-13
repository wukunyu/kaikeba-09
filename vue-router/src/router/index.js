import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PageA from '@/components/PageA';
import PageB from '@/components/PageB';
import Test from '@/components/test';
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/a',
      name: 'pageA',
      // component: HelloWorld
    },
    {
      path: '/b/:id',
      name: 'pageB',
      props: true,
      component: PageB,
      children: [{
        path: 'test',
        component: Test
      }]
    },
    {
      path: '/a',
      name: 'pageA',
      component: PageA
    }
  ]
})
