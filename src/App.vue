<template lang="pug">
  #app.app
    NavBar
    main
      .container
        .app__order
          h2.app__title Papa John's, by Islam Gad
          hr.app__divider
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

  &__order {
    padding-top: 40px;
  }

  &__divider {
    margin: 12px 0 24px;
    color: $gray;
  }
}
</style>
