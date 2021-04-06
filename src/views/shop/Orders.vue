<template>
  <div>
    <div v-if="orders.length != 0">
      <table class="table-cart">
        <thead>
          <tr>
            <th>Aperçu</th>
            <th>Titre</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="i in orders" :key="i._id">
          <tr>
            <th>
              <h3>Commande n° {{ i._id }}</h3>
            </th>
            <th>
              <h4>Total: {{ i.total }} €</h4>
            </th>
          </tr>
          <tr v-for="item in i.products" :key="item._id">
            <td>
              <img class="img-produits" :src="item.image" alt="image produit" />
            </td>
            <td>{{ item.title }}</td>
            <td>{{ item.price }} €</td>
            <td>
              <router-link :to="`/product/${item._id}`">Voir</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 v-else>Vous n'avez aucune commande.</h2>
  </div>
</template>

<script>
import Button from "../../components/Button";
import ApiOrders from "../../mixins/ApiOrders";
import ApiProducts from "../../mixins/ApiProducts";
import ApiUsers from "../../mixins/ApiUsers";

export default {
  data: function () {
    return {
      myTitle: "Mes commandes",
      idProductOrder: [],
      products: [],
      idOrders: [],
      orders: [],
    };
  },
  components: {
    Button,
  },
  mixins: [ApiUsers, ApiProducts, ApiOrders],
  methods: {},
  created: function () {
    this.get_user()
      .then((data) => {
        for (var i = 0; data.user.orders.length > i; i++) {
          this.idOrders.push(data.user.orders[i]._id);
          this.get_order(this.idOrders[i]).then((data) => {
            this.order = data.order;
            this.orders.push(this.order);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
</style>