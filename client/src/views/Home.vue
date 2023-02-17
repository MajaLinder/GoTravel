<template>
  <div>
    <navigation-bar @searchResult="search"></navigation-bar>
    <b-row>
      <b-col cols="12" md="3">
        <div class="sidebar">
          <b-img :src="require('../assets/logo.png')" fluid thumbnail class="image"></b-img>
          <h2 class="font">Welcome to GoTravel</h2>
          <p class="font italic">Unite with your fellow backpackers. Inspire others and get useful tips where to travel next.
          <br> Recieve points for each post and aim for the top list.</p>
        </div>
      </b-col>
    <b-col cols="12" md="9">
    <b-card-group columns>
      <b-container fluid class="example">
        <div v-for="post in posts" v-bind:key="post._id">
          <post-card v-bind:post="post"/>
        </div>
      </b-container>
    </b-card-group>
    </b-col>
    </b-row>
  </div>
</template>

<style>
.image {
  width: 80%;
  height: 80%;
}
.sidebar {
        position: sticky;
        z-index: 1;
        min-width: 100%;
        max-width: 100%;
        border-right: solid 0.5px rgba(0,0,0,0.2);
}
.font {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.italic {
  font-style: italic;
}
</style>

<script>
import { Api } from '../Api'
import NavigationBar from '../components/NavigationBar.vue'
import PostCard from '../components/PostCard.vue'

export default {
  name: 'posts',
  components: {
    'post-card': PostCard,
    NavigationBar
  },

  mounted() {
    Api.get('/posts')
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
    search(searchResult) {
      Api.get(`/posts?country=${searchResult}`)
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
    }
  },
  data() {
    return {
      searchResult: '',
      posts: []
    }
  }
}
</script>
