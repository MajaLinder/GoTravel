import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './views/User.vue'
import CreatePost from './views/CreatePost.vue'
import CreateLinkPhoto from './views/CreateLinkPhoto.vue'
import Post from './views/Post.vue'
import Ranking from './views/Ranking.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user/:user_id',
      name: 'user',
      component: User
    },
    {
      path: '/createPost/:user_id',
      name: 'create',
      component: CreatePost
    },
    {
      path: '/createLinkPhoto/:post_id',
      name: 'createLinkPhoto',
      component: CreateLinkPhoto
    },
    {
      path: '/post/:post_id',
      name: 'post',
      component: Post
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
