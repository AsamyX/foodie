<template lang="pug">
  #app.app
    h1.app__title Foodie App
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss">
$primary: #525F6E;
$accent: #74C0E2;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app {
  &__title {
    color: $primary;
  }
}
</style>
