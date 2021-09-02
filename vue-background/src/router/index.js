import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/book',
    component: Layout,
    redirect: '/book/table',
    name: '书本管理',
    meta: { title: '书本管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '书本列表',
        component: () => import('@/views/recreation/book/list'),
        meta: { title: '书本列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加书本',
        component: () => import('@/views/recreation/book/save'),
        meta: { title: '添加书本', icon: 'tree' }
      },
      {
        path: 'edit/:bookId',   
        name: '编辑书本',
        component: () => import('@/views/recreation/book/save'),
        meta: { title: '编辑书本', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/film',
    component: Layout,
    redirect: '/film/table',
    name: '电影管理',
    meta: { title: '电影管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '电影列表',
        component: () => import('@/views/recreation/film/list'),
        meta: { title: '电影列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加电影',
        component: () => import('@/views/recreation/film/save'),
        meta: { title: '添加电影', icon: 'tree' }
      },
      {
        path: 'edit/:filmId',   
        name: '编辑电影',
        component: () => import('@/views/recreation/film/save'),
        meta: { title: '编辑电影', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/music',
    component: Layout,
    redirect: '/music/table',
    name: '音乐管理',
    meta: { title: '音乐管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '音乐列表',
        component: () => import('@/views/recreation/music/list'),
        meta: { title: '音乐列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加音乐',
        component: () => import('@/views/recreation/music/save'),
        meta: { title: '添加音乐', icon: 'tree' }
      },
      {
        path: 'edit/:musicId',   
        name: '编辑音乐',
        component: () => import('@/views/recreation/music/save'),
        meta: { title: '编辑音乐', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/table',
    name: '活动管理',
    meta: { title: '活动管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '活动列表',
        component: () => import('@/views/banner/list'),
        meta: { title: '活动列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加活动',
        component: () => import('@/views/banner/save'),
        meta: { title: '添加活动', icon: 'tree' }
      },
      {
        path: 'edit/:bannerId',   
        name: '编辑活动',
        component: () => import('@/views/banner/save'),
        meta: { title: '编辑活动', noCache: true },
        hidden: true
      }
    ]
  },

  

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
