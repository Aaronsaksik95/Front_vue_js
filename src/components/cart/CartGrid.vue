<template>
  <div>
    <Button
      v-if="cart"
      class="btn"
      btnText="Supprimer le panier"
      :btnFunction="removeCart"
    />
    <h2 v-else>Votre panier est vide.</h2>
    <table class="table-cart">
      <thead>
        <tr>
          <th colspan="2">Mon panier</th>
        </tr>
      </thead>
      <tbody v-for="item in cartArray" :key="item._id">
        <CartItem :cartObject="item" />
      </tbody>
    </table>
    <div>
      <h3>{{priceTotal}}</h3>
      <h3>{{qtyTotal}}</h3>
    </div>
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
import CartItem from "./CartItem";
import Cart from "../../mixins/Cart";
export default {
  components: {
    CartItem,
    Button,
  },
  props: {
    cartArray: {
      required: true,
      type: Array,
    },
  },
  data: function () {
    return {
      cart: []
    };
  },
  mixins: [Cart],
  created() {
    this.cart = this.get_cart();
  },
  methods: {
    removeCart() {
      this.clearCart();
    }
  },
  computed: {
    priceTotal: function () {
      return this.getTotal(this.cartArray);
    },
    qtyTotal: function () {
      return this.get_cartCount(this.cartArray);
    }
  }
};
</script>

<style lang="scss" scoped>
.table-cart{
  margin: auto;
}
</style>