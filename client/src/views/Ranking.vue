<template>
    <div class="background-ranking">
      <navigation-bar></navigation-bar>
      <b-row>
        <b-col cols="12" md="4"></b-col>
        <b-col cols="12" md="4">
          <h1 id="header">Ranking</h1>
          <div v-for="user in users.slice(0, 5)" v-bind:key="user._id">
            <user-item v-bind:user="user"/>
          </div>
        </b-col>
        <b-col cols="12" md="4"></b-col>
      </b-row>
    </div>
</template>

<style scoped>
#header {
  color: black;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.background-ranking {
   min-height: 100vh;
   background-image: url('../assets/nature.png');
   background-size: cover;
   background-repeat: no-repeat;
   background-position: center center;
}
</style>

<script>
import { Api } from '../Api'
import UserItem from '../components/UserItem.vue'
import NavigationBar from '../components/NavigationBar.vue'

export default {
  name: 'users',
  components: {
    NavigationBar,
    'user-item': UserItem
  },
  mounted() {
    console.log('Page is loaded')
    Api.get('/users/')
      .then(response => {
        console.log(response)
        this.users = response.data.users.sort((a, b) => a.point > b.point ? -1 : 1)
      })
      .catch(error => {
        console.log(error)
        this.users = []
        this.$toasted.global.my_app_error({
          message: 'No users found!'
        })
      })
      .then(() => {
        console.log('This will run every time after success or error')
      })
  },
  data() {
    return {
      users: []
    }
  }
}
</script>
