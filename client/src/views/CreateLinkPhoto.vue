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

      <b-card-body>
        <b-card-title class="format" >+ ADD PHOTO</b-card-title>
        <div>
          <!-- UPLOAD PHOTO -->
          <b-form-group class="format" id="input-group-1" label="TITLE" label-for="input-1">
            <b-form-input
                id="photoTitle"
                v-model="photoTitle"
                placeholder="Enter a title"
            ></b-form-input>
          </b-form-group>
          <b-form-group class="format" id="input-group-1" label="IMAGE URL" label-for="input-1" type="file">
            <b-form-input
              id="imageURL"
              v-model="imageURL"
              placeholder="Enter a url"
              required
            ></b-form-input>
          </b-form-group>
        </div>
      </b-card-body>

      <b-card-body>
        <b-card-title class="format" >+ ADD LINK</b-card-title>
        <div>
          <b-form v-if="show">
            <b-form-group class="format" id="input-group-1" label="TITLE" label-for="input-1">
              <b-form-input
                id="linkTitle"
                v-model="linkTitle"
                placeholder="Enter a title"
                updateLink
              ></b-form-input>
            </b-form-group>

            <b-form-group class="format"  id="input-group-2" label="URL" label-for="input-2">
              <b-form-input
                id="url"
                v-model="url"
                placeholder="Enter url"
              ></b-form-input>
              <div>
                <b-embed type="embed" aspect= ''></b-embed>
              </div>
            </b-form-group>

            <b-form-group class="format" id="input-group-3" label="Category" label-for="input-3">
              <b-form-input
                id="category"
                v-model="category"
                placeholder="Enter category"
              ></b-form-input>
            </b-form-group>
          </b-form>
        </div>
      </b-card-body>
      </b-card>
      <b-button
        class= "buttons"
        type="submit"
        block variant="dark"
        v-on:click="publish"
      >PUBLISH</b-button>
    </div>
    </div>
      <div class="col-12 col-md-3"></div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '../components/NavigationBar.vue'
import { Api } from '../Api'

export default {
  data() {
    return {
      links: [],
      photos: [],
      linkTitle: '',
      url: '',
      category: '',
      photoTitle: '',
      imageURL: '',
      show: true,
      checked: []
    }
  },
  name: 'post',
  components: {
    NavigationBar
  },
  methods: {
    publish() {
      const newPhoto = {
        title: this.photoTitle,
        imageURL: this.imageURL
      }
      Api.post(`/posts/${this.$route.params.post_id}/photos`, newPhoto)
        .then(
          response => {
            console.log(response.data)
            this.photos.push(response.data)
          })
        .catch(error => {
          console.log(error)
          this.$toasted.global.my_app_error({
            message: 'No photos found!'
          })
        })
      const newLink = {
        title: this.linkTitle,
        url: this.url,
        category: this.category
      }
      Api.post(`/posts/${this.$route.params.post_id}/links`, newLink)
        .then(
          response => {
            console.log(response.data)
            this.links.push(response.data)
          })
        .catch(error => {
          console.log(error)
          this.$toasted.global.my_app_error({
            message: 'No links found!'
          })
        })
        .then(function () {
        })

      this.$router.push({ path: '/' })
    }
  }
}
</script>
