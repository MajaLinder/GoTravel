<template>
    <div>
      <p> <br> {{ photo.title }} </p>
      <img class="larger-image" :src="photo.imageURL">
    </div>
</template>

<style scoped>
  .larger-image {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px;
  }
  .smaller-image {
    display: inline-block;
    position: relative;
    width: 50%;
    height: 50%;
    padding: 10px;
  }
</style>

<script>
export default {
  name: 'photo-item',
  props: ['photo']
}
</script>
