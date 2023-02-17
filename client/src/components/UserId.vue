<template>
<div id="UserId">
    <h2>{{ user.username }}</h2>
    <p>{{ user.point }} POINTS</p>
</div>
</template>

<style scoped>
#UserId {
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
color: #000000;
}
p {
font-size: 20px;
}
</style>

<script>
export default {
  name: 'user-item',
  props: ['user']
}
</script>
