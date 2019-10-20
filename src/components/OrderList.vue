<template lang="pug">
  div
    ul
      li(v-for="item in order.order_items")
        p {{item.name}} : {{item.quantity}}
        button(@click="increaseQuantity(item.id)") +
        button(@click="decreaseQuantity(item.id)") -

</template>

<script>
export default {
  name: 'OrderList',

  async mounted() {
    try {
      // Fetching order based on written ID in browser URL, falling back to 122 order ID
      // Will upgrade to use vue-router for real project
      const orderId = (location.pathname+location.search).substr(1) ? (location.pathname+location.search).substr(1) : '122';

      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();
      this.order = data;

    } catch (err) {
      alert(err);
    }
  },

  data() {
    return {
      order: {},
    }
  },

  methods: {
    async increaseQuantity(itemId) {
      try {
        await fetch(`/api/orders/${this.order.id}/items/${itemId}?user_id=2`, {
          method: 'POST'
        });
        this.refetchOrder();

      } catch(err) {
        alert(err)
      }
    },
    async decreaseQuantity(itemId) {
      try {
        await fetch(`/api/orders/${this.order.id}/items/${itemId}?user_id=2`, {
          method: 'DELETE'
        });
        this.refetchOrder();

      } catch(err) {
        alert(err);
      }
    },
    async refetchOrder() {
      try {
        const response = await fetch(`/api/orders/${this.order.id}`);
        const data = await response.json();
        this.order = data;

      } catch(err) {
        alert(err);
      }
    }
  }
}
</script>

<style scoped>

</style>
