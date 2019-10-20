<template lang="pug">
tr.order__body
  td
    p {{item.name}}
  td
    p {{item.price | appendCurrency}}
  td
    .order__quantity-wrapper
      button.order__quantity-button.order__quantity-button--remove(
        :disabled="disableInputs"
        :class="{'order__quantity-button--disabled': disableInputs}"
        @click="$emit('decreaseQuantity', item.id)"
        )
        svg.order__quantity-shape(viewBox='0 0 24 24')
          path(fill='#fff', d='M19,13H5V11H19V13Z')

      p.order__quantity {{item.quantity}}

      button.order__quantity-button.order__quantity-button--add(
        :disabled="disableInputs"
        :class="{'order__quantity-button--disabled': disableInputs}"
        @click="$emit('increaseQuantity', item.id)"
        )
        svg.order__quantity-shape(viewBox='0 0 24 24')
          path(fill='#fff', d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z')

  td.hide-mobile.hide-mobile--cell
    p {{totalItemPrice}}

</template>

<script>
export default {
  name: 'OrderItem',

  props: {
    item: {
      type: Object,
      required: true
    },
    disableInputs: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    totalItemPrice() {
      if(!this.item.quantity || !this.item.price) return 0;

      return this.item.quantity * this.item.price;
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  &__body {
    td {
      padding: 8px 12px 20px 12px;
      border-bottom: 1px solid $gray;
    }

    &:last-child {
      td {
        border-bottom: none;
      }
    }
  }

  &__quantity-wrapper {
    display: flex;
    align-items: center;
  }

  &__quantity {
    border: 2px solid $gray;
    padding: 4px 8px;
    min-width: 35px;
    min-height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 3px;

    @media only screen and (max-width: 650px) {
      min-height: 25px;;
    }
  }

  &__quantity-button {
    background: $accent;
    display: block;
    min-height: 35px;
    padding: 0 12px;
    min-width: 35px;
    min-height: 35px;;

    @media only screen and (max-width: 650px) {
      min-width: 20px;
      min-height: 28px;;
    }

    &--disabled {
      background: $gray;
      cursor: not-allowed;
    }

    &--add {
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
    }

    &--remove {
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
    }
  }

  &__quantity-shape {
    width: 24px;
    height: 24px;

    @media only screen and (max-width: 650px) {
      width: 20px;
    }
  }
}
</style>