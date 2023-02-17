<template>
    <div>
      <navigation-bar></navigation-bar>
        <div class="container">
          <div>
            <h1> {{ post.title }}</h1>
            <h2> {{ post.city }}, {{ post.country }}</h2>
            <div>
              <b-avatar button v-on:click="toUser" variant="dark" size="md"></b-avatar>
              <p> {{ post.author.username }}</p>
            </div>
            <button class="btn btn-light" v-if="userPresent" variant="outline" size="sm" v-b-modal.modal-prevent-closing-posts>Edit</button>
            <br>
            <br>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <p class="small-black-border thick-text">PHOTOS</p>
              <button class="btn btn-light" v-if="userPresent" variant="outline" size="sm" v-b-modal.modal-prevent-closing-photos>Edit</button>
              <br>
              <br>
              <div class="large-black-border thick-text">
              <div v-for="photo in photos" v-bind:key="photo._id">
                <photo-item v-bind:photo="photo"/>
              </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <p class="small-black-border thick-text">LINKS</p>
              <button class="btn btn-light" v-if="userPresent" variant="outline" size="sm" v-b-modal.modal-prevent-closing-links>Edit</button>
              <br>
              <br>
              <div class="large-black-border thick-text">
                <div v-for="link in links" v-bind:key="link._id">
                  <link-item v-bind:link="link"/>
                </div>
              </div>
          </div>
          </div>
      </div>
      <!-- EDIT POSTS FORM -->
      <b-modal
        id="modal-prevent-closing-posts"
        ref="modal"
        title="Edit your post"
        @show="resetPostModal"
        @hidden="resetPostModal"
        @ok="handleOkPost"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Title"
            label-for="title-input"
          >
            <b-form-input
              id="title-input"
              v-model="postTitle"
              :state="titleState"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="City"
            label-for="city-input"
          >
            <b-form-input
              id="city-input"
              v-model="city"
              :state="cityState"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Country"
            label-for="country-input"
          >
            <b-form-input
              id="country-input"
              v-model="country"
              :state="countryState"
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>

      <!-- EDIT LINKS FORM -->
      <b-modal
        id="modal-prevent-closing-links"
        ref="modal"
        title="Edit links"
        @show="resetLinkModal"
        @hidden="resetLinkModal"
        @ok="handleOkLink"
      >
        <form ref="linkForm" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Title"
            label-for="linkTitle-input"
          >
            <b-form-input
              id="linkTitle-input"
              v-model="linkTitle"
              :state="linkTitleState"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="url"
            label-for="url-input"
          >
            <b-form-input
              id="url-input"
              v-model="url"
              :state="urlState"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Category"
            label-for="category-input"
          >
            <b-form-input
              id="category-input"
              v-model="category"
              :state="categoryState"
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>

      <!-- EDIT PHOTO FORM -->
      <b-modal
        id="modal-prevent-closing-photos"
        ref="modal"
        title="Edit photo"
        @show="resetPhotoModal"
        @hidden="resetPhotoModal"
        @ok="handleOkPhoto"
      >
        <form ref="photoForm" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Title"
            label-for="photoTitle-input"
          >
            <b-form-input
              id="photoLitle-input"
              v-model="photoTitle"
              :state="photoTitleState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="imageURL"
            label-for="imageURL-input"
          >
            <b-form-input
              id="imageURL-input"
              v-model="imageURL"
              :state="imageURLState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
</template>

<style>
  .large-black-border {
    position: relative;
    padding: 20px;
    border-radius: 15px;
    border-color: black;
    border-width: 1px;
    border-style: solid;
  }
  .small-black-border {
    position: relative;
    padding: 15px;
    border-radius: 15px;
    border-color: black;
    border-width: 3px;
    border-style: solid;
  }
  .thick-text {
    font-weight: bold;
  }
  .editButton {
    position: top;
  }
</style>

<script>
import { Api } from '../Api'
import NavigationBar from '../components/NavigationBar.vue'
import PhotoItem from '../components/PhotoItem.vue'
import LinkItem from '../components/LinkItem.vue'

export default {
  data() {
    return {
      userPresent: false,
      post: {
        title: '',
        city: '',
        country: '',
        author: ''
      },
      photos: [],
      links: [],
      postTitle: '',
      titleState: null,
      city: '',
      cityState: null,
      country: '',
      countryState: null,
      linkTitle: '',
      linkTitleState: null,
      url: '',
      urlState: null,
      category: '',
      categoryState: null,
      photoTitle: '',
      photoTitleState: null,
      imageURL: '',
      imageURLState: null,
      link_id: '',
      form: [],
      linkForm: [],
      photoForm: []
    }
  },
  components: {
    NavigationBar,
    'photo-item': PhotoItem,
    'link-item': LinkItem
  },
  name: 'posts',
  mounted() {
    Api.get(`/posts/${this.$route.params.post_id}`)
      .then(response => {
        this.post = response.data
        const user = JSON.parse(localStorage.getItem('user-info'))
        if (user.users[0]._id === this.post.author._id) {
          this.userPresent = true
        } else {
          this.userPresent = false
        }
      })
      .catch(error => {
        console.log(error)
        this.post = null
        this.$toasted.global.my_app_error({
          message: 'No posts found!'
        })
      })
      .then(() => {
        console.log('This will run every time after success or error')
      })
    Api.get(`/posts/${this.$route.params.post_id}/photos`)
      .then(response => {
        console.log(response)
        this.photos = response.data.photos
      })
      .catch(error => {
        console.log(error)
        this.photos = []
        this.$toasted.global.my_app_error({
          message: 'No photos found!'
        })
      })
      .then(() => {
        console.log('This will run every time after success or error')
      })
    Api.get(`/posts/${this.$route.params.post_id}/links`)
      .then(response => {
        console.log(response)
        this.links = response.data.links
      })
      .catch(error => {
        console.log(error)
        this.links = []
        this.$toasted.global.my_app_error({
          message: 'No links found!'
        })
      })
      .then(() => {
        console.log('This will run every time after success or error')
      })
  },
  methods: {
    toUser() {
      this.$router.push({ path: `/user/${this.post.author._id}` })
    },
    checkFormValidityPost() {
      const valid = this.$refs.form.checkValidity()
      this.postTitleState = valid
      this.cityState = valid
      this.countryState = valid
      return valid
    },
    checkFormValidityLinks() {
      const valid = this.$refs.linkForm.checkValidity()
      this.linkTitleState = valid
      this.urlState = valid
      this.categoryState = valid
      return valid
    },
    checkFormValidityPhotos() {
      const valid = this.$refs.photoForm.checkValidity()
      this.photoTitleState = valid
      this.imageURLState = valid
      return valid
    },
    resetPostModal() {
      this.postTitle = ''
      this.titleState = null
      this.city = ''
      this.cityState = null
      this.country = ''
      this.countryState = null
    },
    resetLinkModal() {
      this.linkTitle = ''
      this.linkTitleState = null
      this.url = ''
      this.urlState = null
      this.category = ''
      this.categoryState = null
    },
    resetPhotoModal() {
      this.photoTitle = ''
      this.photoTitleState = null
      this.imageURL = ''
      this.imageURLState = null
    },
    handleOkPost(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.updatePost()
    },
    handleOkLink(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.updateLink()
    },
    handleOkPhoto(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.updatePhoto()
    },
    updatePost() {
      // Exit when the form isn't valid
      if (!this.checkFormValidityPost()) {
        return
      }
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing-posts')
      })
      const updatedPost = {
        title: this.postTitle,
        country: this.country,
        city: this.city,
        published: true
      }
      Api.patch(`/posts/${this.$route.params.post_id}`, updatedPost)
        .then(
          response => {
            console.log(response.data)
            this.form.push(response.data)
          })
        .catch(error => {
          console.log(error)
          this.$toasted.global.my_app_error({
            message: 'Post Updated!'
          })
        })
        .then(function () {
        })
    },
    updateLink() {
      // Exit when the form isn't valid
      if (!this.checkFormValidityLinks()) {
        return
      }
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing-links')
      })
      const updatedLink = {
        title: this.linkTitle,
        url: this.url,
        category: this.category
      }
      if (this.post.link.length) {
        Api.patch(`/links/${this.post.link[0]}`, updatedLink)
          .then(
            response => {
              console.log(response.data)
              this.linkForm.push(response.data)
              this.links[0].url = response.data.url
              this.links[0].title = response.data.title
              this.links[0].category = response.data.category
            })
          .catch(error => {
            console.log(error)
            this.$toasted.global.my_app_error({
            })
          })
          .then(function () {
          })
      } else {
        Api.post(`/posts/${this.$route.params.post_id}/links`, updatedLink)
          .then(
            response => {
              this.links.push(response.data)
            })
          .catch(error => {
            console.log(error)
            this.$toasted.global.my_app_error({
              message: 'No post found!'
            })
          })
          .then(function () {
          })
      }
    },
    updatePhoto() {
      // Exit when the form isn't valid
      if (!this.checkFormValidityPhotos()) {
        return
      }
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing-photos')
      })
      const updatedPhoto = {
        title: this.photoTitle,
        imageURL: this.imageURL
      }
      if (this.post.photo.length) {
        Api.put(`/photos/${this.post.photo[0]}`, updatedPhoto)
          .then(
            response => {
              console.log('data for photo', response.data)
              this.photoForm.push(response.data)
              this.photos[0].imageURL = response.data.imageURL
              this.photos[0].title = response.data.title
            })
          .catch(error => {
            console.log(error)
            this.$toasted.global.my_app_error({
            })
          })
          .then(function () {
          })
      } else {
        Api.post(`/posts/${this.$route.params.post_id}/photos`, updatedPhoto)
          .then(
            response => {
              this.photos.push(response.data)
            })
          .catch(error => {
            console.log(error)
            this.$toasted.global.my_app_error({
              message: 'No post found!'
            })
          })
          .then(function () {
          })
      }
    }
  }
}
</script>
