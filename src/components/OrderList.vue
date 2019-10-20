<template lang="pug">
  div
    ul
      li(v-for="item in order.order_items") {{item}}

</template>

<script>
export default {
  name: 'OrderList',
  async mounted() {
    try {
      const response = await fetch('/api/orders/122');
      const data = await response.json();
      this.order = data;

    } catch (err) {
      throw new Error(err);
    }
  },
  data() {
    return {
      order: {}
    }
  }
}
</script>

<style scoped>

</style>
