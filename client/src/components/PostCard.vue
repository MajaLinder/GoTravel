<template>
<div>
  <div class="cards">
    <b-card v-if="!post.photo.length || post.photo[0].imageURL === ''"
      :title='post.postTitle'
      :img-src="require('../assets/logo.png')"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 100%;"
      class="mb-2"
    >
      <b-card-text>
        {{ post.city }}, {{ post.country }}
      </b-card-text>
      <b-button class="button mr-1" href="#" variant="dark" v-on:click="toPost">GoTravel</b-button>
      <b-button v-if="userPresent" class="button mr-1" href="#" variant="dark" v-on:click="deletePost">Delete</b-button>
    </b-card>
  </div>
  <div class="cards">
    <b-card v-if="post.photo.length && post.photo[0].imageURL !== ''"
      :title='post.postTitle'
      :img-src='post.photo[0].imageURL'
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 100%;"
      class="mb-2"
    >
      <b-card-text>
        {{ post.city }}, {{ post.country }}
      </b-card-text>
      <b-button class="button mr-1" href="#" variant="dark" v-on:click="toPost">GoTravel</b-button>
      <b-button v-if="userPresent" class="button mr-1" href="#" variant="dark" v-on:click="deletePost">Delete</b-button>
    </b-card>
  </div>
</div>
</template>

<style scoped>
.button {
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.cards .card-title {
font-size: 20px;
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>

<script>

export default {
  name: 'post-card',
  props: ['post'],
  data() {
    return {
      userPresent: false
    }
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user-info'))

    if (user === null) {
      console.log('Local storage empty')
    } else {
      if (user.users[0]._id === this.post.author) {
        this.userPresent = true
      } else {
        this.userPresent = false
      }
    }
  },
  methods: {
    toPost() {
      this.$router.push({ path: `/post/${this.post._id}` })
    },
    deletePost() {
      this.$emit('deletedPost', this.post._id)
    }
  }
}
</script>
