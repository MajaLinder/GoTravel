<template>
  <body>
  <navigation-bar></navigation-bar>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-5 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h2 class="card-title text-center">Sign In</h2>
            <form>
              <div class="form-floating mb-3 text-center">
                <b-img :src="require('../assets/logo.png')" fluid thumbnail></b-img>
                <p><br>
                <input type="text" name="username" v-model="login.username" placeholder="Username"/><br><br>
                <input type="password" name="password" v-model="login.password" placeholder="Password" /><br><br>
                <button type="button" v-on:click="login">SIGN IN</button>
                <br><router-link to="/signup">Sign up</router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>
</template>

<style scoped>
body {
  min-height: 100vh;
  background-image: url('../assets/eiffel-tower.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.card {
  background-color:rgba(255, 255, 255, 0.884);
}
h2 {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>
<script>
import { Api } from '../Api'
import NavigationBar from '../components/NavigationBar.vue'

export default {
  name: 'Login',
  components: {
    NavigationBar
  },
  mounted() {
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
    login() {
      Api.get(`/users?username=${this.login.username}&password=${this.login.password}`)
        .then(response => {
          console.log(response)
          this.users = response.data.users
          if (this.users.length) {
            localStorage.setItem('user-info', JSON.stringify(response.data))
            this.$router.push({ name: 'home' })
          } else {
            this.$toasted.global.my_app_error({
              message: 'No user found!'
            })
          }
        })
        .catch(error => {
          console.log(error)
          this.$toasted.global.my_app_error({
          })
        })
        .then(() => {
          console.log('This will run every time after success or error')
        })
    },
    data() {
      return {
        users: [],
        login: {
          username: '',
          password: ''
        }
      }
    }
  }
}
</script>
