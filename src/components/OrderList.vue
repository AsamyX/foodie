<template lang="pug">
table
  thead
    td Order Items
    td Price
    td Quantity
  tbody
    template(v-if="!order.order_items[0]") No items
    OrderItem(
      v-for="item in order.order_items"
      :item="item"
      :key="item.id"
      @increaseQuantity="increaseQuantity"
      @decreaseQuantity="decreaseQuantity"
      )

</template>

<script>
import OrderItem from '@/components/OrderItem';
export default {
  name: 'OrderList',

  async mounted() {
    try {
      /*
      Fetching order 122 by default.
      To test another order, enter the order ID in browser url as the first URL param. Ex: localhost:8080/272
      */
      const orderId = (location.pathname+location.search).substr(1) ? (location.pathname+location.search).substr(1) : '122';

      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();
      this.order = data;

    } catch (err) {
      alert(err);
    }
  },

  components: {
    OrderItem
  },

  data() {
    return {
      order: {}
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
