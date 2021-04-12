<template>
  <div>
    <div v-if="cart" class="div-test">
      <TitlePage title="Mon panier" />
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-2">Aperçu</div>
          <div class="col col-1">Titre</div>
          <div class="col col-1">Prix</div>
          <div class="col col-1">Quantité</div>
          <div class="col col-1">Total</div>
          <div class="col col-2">Produit</div>
          <div class="col col-2">Supprimer</div>
        </li>
        <li class="table-row" v-for="item in cart" :key="item.id">
          <div class="col col-2">
            <img class="img-produits" :src="item.image" alt="image produit" />
          </div>
          <div class="col col-1">{{ item.title }}</div>
          <div class="col col-1">{{ item.price }} €</div>
          <div class="col col-1">
            <input
              class="input-qty"
              type="number"
              min="1"
              v-model="item.qty"
              @change="() => editQuantity(item.qty, item._id)"
            />
          </div>
          <div class="col col-1">
            <td>{{ item.qty * item.price }} €</td>
          </div>
          <div class="col col-2">
            <router-link :to="`/product/${item._id}`"
              >Voir le produit</router-link
            >
          </div>
          <div class="col col-2">
            <div class="div-icon">
              <img
                @click="() => removeItemCart(item)"
                class="img-icon"
                src="../../assets/corbeille.png"
                alt=""
              />
            </div>
          </div>
        </li>
      </ul>
      <div>
        <h3>Total: {{ getTotal }} €</h3>
        <h3>Quantité total: {{ getQty }} produits.</h3>
      </div>
      <Button class="btn" btnText="Commander" :btnFunction="orderCart" />
      <Button
        class="btn"
        btnText="Supprimer le panier"
        :btnFunction="removeCart"
      />
    </div>
    <h2 v-else>Votre panier est vide.</h2>
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
import TitlePage from "../../components/tools/TitlePage";
import Cart from "../../mixins/Cart";
import ApiOrders from "../../mixins/ApiOrders";

export default {
  name: "Cart",
  components: {
    TitlePage,
    Button,
  },
  data: function () {
    return {
      cart: [],
      d_button: false,
    };
  },
  mixins: [Cart, ApiOrders],
  created() {
    this.cart = this.get_cart();
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
      if (localStorage.getItem("token")) {
        await this.stripeOrder();
      } else {
        this.$router.push("./login");
      }
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
.responsive-table {
  width: 50%;
  margin: auto;
  li {
    border-radius: 30px;
    padding: 25px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .img-produits {
      width: 100%;
    }
    a {
      color: #39cdd8;
      font-weight: bold;
    }
    .input-qty {
      width: 30px;
      margin: 0px;
    }
    .div-icon {
      width: 35px;
      height: 35px;
      border-radius: 50px;
      background-color: rgb(219, 219, 219);
      margin: auto;
      .img-icon {
        margin-top: 15%;
        width: 70%;
        border-radius: 10px;
      }
    }
  }
  .table-header {
    background-color: #39cdd8;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .table-row {
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  }
  .col-1 {
    flex-basis: 20%;
  }
  .col-2 {
    flex-basis: 30%;
  }
}
</style>