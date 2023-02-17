<template>
    <div>
      <p> <br> {{ link.title }} <br> {{ link.category }} <br> {{ link.url }} </p>
    </div>
</template>

<script>
export default {
  name: 'link-item',
  props: ['link']
}
</script>
