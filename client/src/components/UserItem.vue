<template>
  <div>
    <br>
    <b-row align-h="center">
    <p class="black-border">{{ user.username }} - {{ user.point }} POINTS</p>
    </b-row>
  </div>
</template>

<style scoped>
p {
font-family: monospace;
}
.black-border {
    position: relative;
    padding: 10px;
    margin: 0px;
    border-radius: 5px;
    border-color: black;
    border-width: 1px;
    border-style: solid;
    width: 80%;
    box-shadow: inset 0px 3px 3px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.74);
}
</style>

<script>
export default {
  name: 'user-item',
  props: ['user']
}
</script>
