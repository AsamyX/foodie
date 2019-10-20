<template lang="pug">
  #app.app
    NavBar
    h1.app__title Papa John's, by Islam Gad
    OrderList
</template>

<script>
import OrderList from '@/components/OrderList'
import NavBar from '@/components/NavBar'

export default {
  name: 'app',
  components: {
    OrderList,
    NavBar
  }
}
</script>

<style lang="scss">
.app {
  background: $gray--lighter;
  height: 100vh;

  &__title {
    color: $primary;
  }
}
</style>
