<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand class="format" href="#" v-on:click="toHome">GoTravel</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="format" href="#" v-on:click="toRanking">Ranking</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto format">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2 format" placeholder="Search by country" v-model="searchResult"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0 format" v-on:click="search">Search</b-button>
            &nbsp;
            <b-button v-if="userPresent" size="sm" v-on:click="signOut">Sign Out</b-button>
            <b-button v-else size="sm" v-on:click="toLogin">Login</b-button>
           </b-nav-form>

            <!-- Using 'button-content' slot -->
            <b-avatar button v-if="userPresent" v-on:click="toUser" variant="dark" size="md"></b-avatar>
         </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <br>
  </div>
</template>

<style scoped>
  h2{
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>

<script>
import { Api } from '../Api'

export default {
  data() {
    return {
      users: [],
      username: '',
      password: '',
      searchResult: '',
      userPresent: false
    }
  },
  mounted() {
    const user = localStorage.getItem('user-info')
    if (user) {
      this.userPresent = true
    } else {
      this.userPresent = false
    }
    Api.get('/users')
      .then(response => {
        this.users = response.data.users
      })
      .catch(error => {
        console.log(error)
        this.users = null
        this.$toasted.global.my_app_error({
          message: 'No users found!'
        })
      })
      .then(() => {
        console.log('This will run every time after success or error')
      })
  },
  methods: {
    toUser() {
      const currentUser = JSON.parse(localStorage.getItem('user-info'))
      this.$router.push({ path: `/user/${currentUser.users[0]._id}` })

      if (!currentUser) {
        this.$router.push({ name: 'home' })
      }
    },
    toRanking() {
      this.$router.push({ path: '/ranking' })
    },
    toHome() {
      this.$router.push({ path: '/' })
    },
    signOut() {
      localStorage.clear()
      this.userPresent = false
      this.$router.push({ name: 'login' })
    },
    toLogin() {
      this.$router.push({ path: '/login' })
    },
    search() {
      this.$emit('searchResult', this.searchResult)
    }
  }
}
</script>
