<template>
<div>
    <navigation-bar></navigation-bar>
    <user-item v-bind:user="user"/>
    <div class="buttons">
      <b-button variant="dark" v-if="userPresent" v-on:click="toCreatePost">Create a new post</b-button>
    </div><br>
    <div class="buttons">
      <b-button variant="dark" v-if="userPresent" v-on:click="deleteAllPosts">Delete all posts</b-button>
    </div><br>
      <b-card-group columns>
        <b-container fluid class="example">
          <div class="cards">
            <div v-for="post in posts" v-bind:key="post._id">
              <post-card v-bind:post="post" @deletedPost="deletePost"/>
            </div>
          </div>
        </b-container>
      </b-card-group>
</div>
</template>

<style scoped>
.buttons {
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.cards .card-title {
font-size: 20px;
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>

<script>
import { Api } from '../Api'
import PostCard from '../components/PostCard.vue'
import UserId from '../components/UserId.vue'
import NavigationBar from '../components/NavigationBar.vue'

export default {
  name: 'user',
  components: {
    NavigationBar,
    'post-card': PostCard,
    'user-item': UserId
  },
  mounted() {
    Api.get(`/users/${this.$route.params.user_id}`)
      .then(response => {
        console.log(response)
        this.user = response.data

        const user = JSON.parse(localStorage.getItem('user-info'))
        if (user.users[0]._id === this.user._id) {
          this.userPresent = true
        } else {
          this.userPresent = false
        }
      })
      .catch(error => {
        console.log(error)
        this.user = null
        this.$toasted.global.my_app_error({
          message: 'No users found!'
        })
      })
      .then(() => {
        console.log('This will run every time after success or error')
      })
    Api.get(`/users/${this.$route.params.user_id}/posts`)
      .then(response => {
        console.log(response)
        this.posts = response.data.posts
      })
      .catch(error => {
        console.log(error)
        this.posts = []
        this.$toasted.global.my_app_error({
          message: 'No posts found!'
        })
      })
      .then(() => {
        console.log('This will run every time after success or error')
      })
  },
  methods: {
    toCreatePost() {
      this.$router.push({ path: `/createPost/${this.user._id}` })
    },
    deletePost(id) {
      Api.delete(`/posts/${id}`)
        .then(response => {
          const index = this.posts.findIndex(post => post._id === id)
          this.posts.splice(index, 1)
          this.$toasted.global.my_app_error({
            message: 'Post deleted!'
          })
        })
      const updatedUser = {
        point: this.user.point -= 1
      }
      Api.patch(`/users/${this.user._id}`, updatedUser)
        .then(
          response => {
            console.log(response.data)
            this.user.push(response.data)
            this.$toasted.global.my_app_error({
              message: 'User updated!'
            })
          })
        .catch(error => {
          console.log(error)
        })
        .then(function () {
        })
    },
    deleteAllPosts() {
      Api.delete(`/users/${this.$route.params.user_id}/posts`)
        .then(response => {
          console.log(response)
          this.posts.splice(0, this.posts.length)
          this.$toasted.global.my_app_error({
            message: 'All posts deleted!'
          })
        })
      const updatedUser = {
        point: this.user.point = 0
      }
      Api.patch(`/users/${this.user._id}`, updatedUser)
        .then(
          response => {
            console.log(response.data)
            this.user.push(response.data)
          })
        .catch(error => {
          console.log(error)
          this.$toasted.global.my_app_error({
          })
        })
        .then(function () {
        })
    }
  },
  data() {
    return {
      user: [],
      posts: [],
      userPresent: false
    }
  }
}
</script>
