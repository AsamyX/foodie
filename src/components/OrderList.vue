<template lang="pug">
table.order
  .order__loader(:class="{'order__loader--active': processing || fetching}")
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
      strong.order__feedback.order__feedback--fetching(v-if="fetching") Fetching order details...
      p.order__feedback.order__feedback--error(v-else-if="!order.id") Order not found.

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
      if(!response.ok) throw new Error(response.statusText || 'Network request failed');

      const data = await response.json();
      this.order = data;

    } catch (e) {
      this.$toasted.error(e);
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

      } catch(e) {
        this.$toasted.error(e)
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

      } catch(e) {
        this.$toasted.error(e);
      } finally {
        this.processing = false;
      }
    },
    async refetchOrder() {
      try {
        const response = await fetch(`/api/orders/${this.order.id}`);
        this.order = await response.json();

      } catch(e) {
        this.$toasted.error(e);
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
  position: relative;

  &__head {
    td {
      padding: 12px;
      border-bottom: 1px solid $gray;
    }
  }

  &__loader {
    background: $accent;
    height: 4px;
    width: 55%;
    position: absolute;
    top: -4px;
    left: 0;
    display: none;
    animation: loader 1s linear infinite alternate;

    &--active {
      display: block;
    }
  }

  @keyframes loader {
    from {
      left: 0;
    }

    to {
      left: 45%;
    }
  }

  &__feedback {
    padding: 30px 12px;
    width: 100%;
    display: block;

    &--fetching {
      opacity: 0.5;
    }

    &--error {
      color: red;
    }
  }
}
</style>
