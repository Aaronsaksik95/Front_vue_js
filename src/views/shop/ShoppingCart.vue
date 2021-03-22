<template>
  <div>
    <div v-if="cart">
      <TitlePage :title="myTitle" />
      <Button
        class="btn"
        btnText="Supprimer le panier"
        :btnFunction="removeCart"
      />
      <table class="table-cart">
        <thead>
          <tr>
            <th>Aperçu</th>
            <th>Titre</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td>
              <img class="img-produits" :src="item.image" alt="image produit" />
            </td>
            <td>{{ item.title }}</td>
            <td>
              <input
                class="input-qty"
                type="number"
                min="1"
                v-model="item.qty"
                @change="() => editQuantity(item.qty, item._id)"
              />
            </td>
            <td>{{ item.price }} €</td>
            <td>
              <router-link :to="`/product/${item._id}`">Voir</router-link>
            </td>
            <td>{{ item.qty * item.price }} €</td>
            <td>
              <button @click="() => removeProductCart(item)">
                Supprimer le produit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <h3>Total: {{ priceTotal }} €</h3>
        <h3>Quantité total: {{ qtyTotal }} produits.</h3>
      </div>
      <Button
        class="btn"
        btnText="Commander"
        :btnFunction="orderCart"
      />
    </div>
    <h2 v-else>Votre panier est vide.</h2>
  </div>
</template>

<script>
import Button from "../../components/Button";
import TitlePage from "../../components/TitlePage";
import Cart from "../../mixins/Cart";
import ApiOrders from "../../mixins/ApiOrders"

export default {
  name: "Cart",
  components: {
    TitlePage,
    Button,
  },
  data: function () {
    return {
      myTitle: "Panier",
      cart: [],
      d_button: false,
    };
  },
  mixins: [Cart, ApiOrders],
  created() {
    this.cart = this.getCart();
  },
  methods: {
    editQuantity(qty, id) {
      this.edit_quantity(qty, id);
    },
    displayButton() {
      this.d_button = true;
    },
    removeCart() {
      this.remove_cart();
    },
    removeItemCart(item) {
      this.remove_item_cart(item);
    },
    orderCart(){
      this.order_cart()
    }
  },
  computed: {
    priceTotal: function () {
      if (this.cart) {
        return this.getTotal(this.cart);
      }
    },
    qtyTotal: function () {
      if (this.cart) {
        return this.getCartCount(this.cart);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-cart {
  margin: auto;
}
.img-produits {
  width: 40px;
}
.input-qty {
  width: 30px;
}
</style>