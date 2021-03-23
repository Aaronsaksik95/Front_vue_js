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
              <button @click="() => removeItemCart(item)">
                Supprimer le produit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <h3>Total: {{ getTotal }} €</h3>
        <h3>Quantité total: {{ getQty }} produits.</h3>
      </div>
      <Button class="btn" btnText="Commander" :btnFunction="orderCart" />
    </div>
    <h2 v-else>Votre panier est vide.</h2>
  </div>
</template>

<script>
import apiConfigs from "../../configs/api.configs";
import Button from "../../components/Button";
import TitlePage from "../../components/TitlePage";
import Cart from "../../mixins/Cart";
import ApiOrders from "../../mixins/ApiOrders";
import { loadStripe } from "@stripe/stripe-js";
import config from "../../configs/stripe.config";

const stripePromise = loadStripe("pk_test_51IYBNvEQHZJwGPKJsBVhHzLtgNp955e6drYz0RILC0zOfwZGYny4lG8DLyN5GmRornKBXXKkKLbb51PgsMEnY1GQ007qQCwhJq");

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
    orderCart: async function () {
      const stripe = await stripePromise;

      const response = await fetch(
        `${apiConfigs.apiUrl}create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify({
            amount: this.getTotal*100,
          }),
        }
      );
      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      console.log(result);
      if (result.error) {
        console.log(result.error);
      }
      this.order_cart(this.cart, this.getTotal);
      this.remove_cart()
    },
  },
  computed: {
    getTotal: function () {
      if (this.cart) {
        return this.get_total(this.cart);
      }
    },
    getQty: function () {
      if (this.cart) {
        return this.get_Qty(this.cart);
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