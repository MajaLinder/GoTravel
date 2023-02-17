<template>
  <div>
  <navigation-bar></navigation-bar>
  <div class="row">
    <div class="col-12 col-md-3"></div>
      <div class="col-12 col-md-6">
  <div class="cards format">
    <b-card
      style="max-width: 100%;"
      class="mb-2 card1"
    >
      <template #header>
        <h4 class="mb-0">New Post</h4>
      </template>

      <b-card-title class="format" >POST INFO</b-card-title>
      <b-form-group class="format" id="input-group-2" label="City" label-for="input-2">
        <b-form-input
          id="city"
          v-model="city"
          placeholder="Enter city name"
        ></b-form-input>
      </b-form-group>

      <b-form-group class="format" id="input-group-3" label="Country" label-for="input-3">
        <b-form-input
          id="country"
          v-model="country"
          placeholder="Enter country name"
        ></b-form-input>
      </b-form-group>

      <b-form-group class="format" id="input-group-4" label="Post Title" label-for="input-4">
        <b-form-input
          id="postTitle"
          v-model="title"
          placeholder="Enter post title"
        ></b-form-input>
      </b-form-group>
    </b-card>
    <b-button
      class= "buttons"
      type="submit"
      block variant="dark"
      v-on:click="next"
    >NEXT</b-button>
    </div>
    </div>
      <div class="col-12 col-md-3"></div>
    </div>
  </div>
</template>

<style scoped>
  .cards {
    padding: 20px;
  }

  .format{
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
</style>

<script>
import NavigationBar from '../components/NavigationBar.vue'
import { Api } from '../Api'

export default {
  data() {
    return {
      posts: [],
      users: [],
      title: '',
      country: '',
      city: '',
      user: null
    }
  },
  components: {
    NavigationBar
  },
  methods: {
    async next() {
      await Api.get(`/users/${this.$route.params.user_id}`)
        .then(response => {
          console.log(response)
          this.user = response.data
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
      const newPost = {
        title: this.title,
        country: this.country,
        city: this.city,
        author: this.user._id
      }
      await Api.post('/posts', newPost)
        .then(
          response => {
            this.posts.push(response.data)
          })
        .catch(error => {
          console.log(error)
          this.$toasted.global.my_app_error({
            message: 'No posts found!'
          })
        })
        .then(function () {
        })
      const createdPost = this.posts[this.posts.length - 1]
      // TODO: Connect to logged in user later
      const updatedUser = {
        point: this.user.point += 1
      }
      await Api.patch(`/users/${this.$route.params.user_id}`, updatedUser)
        .then(
          response => {
            console.log(response.data)
            this.users.push(response.data)
          })
        .catch(error => {
          console.log(error)
          this.$toasted.global.my_app_error({
          })
        })
        .then(function () {
        })
      this.$router.push({ path: `/createLinkPhoto/${createdPost._id}` })
    }
  }
}
</script>
