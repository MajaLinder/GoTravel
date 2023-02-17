<template>
  <body>
  <navigation-bar></navigation-bar>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-5 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h2 class="card-title text-center">Sign Up</h2>
    <form>
    <div class="form-floating mb-3 text-center">
        <b-img :src="require('../assets/logo.png')" fluid thumbnail></b-img><br><br>
        <input type="text" v-model="inputUsername" placeholder="Enter Username"/><br><br>
        <input type="password" v-model="password" placeholder="Enter Password"/><br><br>
        <div class="d-grid">
        <button class="btn btn-primary btn-login text-uppercase fw-bold" type="button" v-on:click="signup">SIGN UP</button>
    </div>
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
  name: 'SignUp',
  components: {
    NavigationBar
  },
  data() {
    return {
      inputUsername: '',
      username: '',
      password: '',
      point: '0',
      users: []
    }
  },
  methods: {
    async signup() {
      await Api.get('/users')
        .then(response => {
          console.log(response)
          this.users = response.data.users
        })
        .catch(error => {
          console.log(error)
          this.$toasted.global.my_app_error({
          })
        })
        .then(() => {
          console.log('This will run every time after success or error')
        })

      let validUsername = true
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].username === this.inputUsername) {
          this.$toasted.global.my_app_error({
            message: 'Username already exists'
          })
          validUsername = false
          break
        }
      }

      if (validUsername === true) {
        const result = await Api.post('/users', {
          username: this.inputUsername,
          password: this.password,
          point: this.point
        })
        console.log(result)
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>
