<template lang="pug">
table.order
  thead
    tr.order__head
      td
        h3 Order Items
      td
        h3 Price
      td
        h3 Quantity
      td.hide-mobile.hide-mobile--cell
        h3 Total
  tbody
    tr
      strong.order__fetching(v-if="fetching") Fetching order details...
    
    OrderItem(
      v-for="item in order.order_items"
      :item="item"
      :disableInputs="processing"
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

      this.fetching = true;

      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();
      this.order = data;

    } catch (err) {
      alert(err);
    } finally {
      this.fetching = false;
    }
  },

  components: {
    OrderItem
  },

  data() {
    return {
      order: {},
      processing: false,
      fetching: false
    }
  },

  methods: {
    async increaseQuantity(itemId) {
      try {
        this.processing = true;

        await fetch(`/api/orders/${this.order.id}/items/${itemId}?user_id=2`, {
          method: 'POST'
        });
        await this.refetchOrder();

      } catch(err) {
        alert(err)
      } finally {
        this.processing = false;
      }
    },
    async decreaseQuantity(itemId) {
      this.processing = true;
      try {
        await fetch(`/api/orders/${this.order.id}/items/${itemId}?user_id=2`, {
          method: 'DELETE'
        });
        await this.refetchOrder();

      } catch(err) {
        alert(err);
      } finally {
        this.processing = false;
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

<style scoped lang="scss">
.order {
  border-collapse: collapse; 
  background: white;
  width: 100%;
  color: $primary;

  &__head {
    td {
      padding: 12px;
      border-bottom: 1px solid $gray;
    }
  }

  &__fetching {
    padding: 30px 12px;
    width: 100%;
    display: block;
  }
}
</style>
