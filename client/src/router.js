import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      props: true,
      component: Home,
      children: [
        {
          path: '/',
          name: 'article',
          component: () => import('./components/Article.vue')
        },
        {
          path: '/article/:id',
          name: 'detail-article',
          props: true,
          component: () => import('./components/DetailArticle.vue')
        }
      ]
    },
    {
      path: '/myarticles',
      name: 'myarticles',
      component: () => import('./views/MyArticle.vue')
    },
    {
      path: '/login',
      name: 'login',
      props: true,
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    }
  ]
})
