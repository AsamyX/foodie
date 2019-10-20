<template lang="pug">
tr
  td
    p {{item.name}}
  td
    p {{item.price}}
  td
    p {{item.quantity}}
    button(@click="$emit('increaseQuantity', item.id)") +
    button(@click="$emit('decreaseQuantity', item.id)") -
</template>

<script>
export default {
  name: 'OrderItem',

  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
  
</style>