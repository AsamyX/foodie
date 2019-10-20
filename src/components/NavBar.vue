<template lang="pug">
header.header
  .container
    .header__wrapper
      h1.hide-tablet Foodie
      button.show-tablet
        svg(style='width:24px;height:24px', viewBox='0 0 24 24')
          path(fill='#74C0E2', d='M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z')
      h1.show-tablet Foodie
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style lang="scss" scoped>
.header {
  padding: 20px;
  background-color: $primary;
  color: $accent;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center
  }
}
</style>