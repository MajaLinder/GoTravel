<template>
  <div id="app">
    <div id="nav">
    </div>

    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.form-floating input, .form-floating input {
    position: relative;
    padding: 5px;
    margin: 0px;
    border-radius: 5px;
    border-color: black;
    border-width: 1px;
    border-style: solid;
    width: 80%;
    box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.25);

    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
.form-floating button, .form-floating button {
    position: relative;
    padding: 5px;
    margin: 0px;
    border-radius: 5px;
    border-color: black;
    border-width: 1px;
    border-style: solid;
    width: 80%;
    background-color: rgb(56, 56, 56);
    color: white;

    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
.form-floating button:hover, .form-floating button:hover {
  background-color: black;
  }
.form-floating img, .form-floating img {
    width: 50%;
    height: auto;
  }
</style>
