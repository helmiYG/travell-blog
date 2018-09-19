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
          path: '/articles/:id',
          name: 'detail-article',
          props: true,
          component: () => import('./components/DetailArticle.vue')
        }
      ]
    },
    {
      path: '/myarticles',
      name: 'myarticles',
      component: () => import('./views/MyArticle.vue'),
      children: [
        {
          path: '/myarticles',
          name: 'my-article',
          component: () => import('./components/MyContent.vue')
        },
        {
          path: '/myarticles/insert',
          name: 'insert',
          props: true,
          component: () => import('./components/Insert.vue')
        },
        {
          path: '/myarticles/:id',
          name: 'detail-my-article',
          props: true,
          component: () => import('./components/MyArticleDetail.vue')
        },
        {
          path: '/myarticles/:id/edit',
          name: 'detail-my-article',
          props: true,
          component: () => import('./components/Edit.vue')
        }
      ]
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
