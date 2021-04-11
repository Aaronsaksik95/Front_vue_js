<template>
  <div>
    <div v-if="orders.length != 0">
      <div v-for="i in orders" :key="i._id" class="orders">
        <div class="info-order">
          <p><strong>Commande:</strong> {{ i._id }}</p>
          <p><strong>Date:</strong> {{ i.date.substring(0, 10) }}</p>
          <p><strong>Heure:</strong> {{ i.date.substring(12, 16) }}</p>
          <p><strong>Total:</strong> {{ i.total }}€</p>
        </div>
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-2">Aperçu</div>
            <div class="col col-1">Titre</div>
            <div class="col col-1">Prix</div>
            <div class="col col-2">Produit</div>
          </li>
          <li class="table-row" v-for="item in i.products" :key="item.id">
            <div class="col col-2">
              <img class="img-produits" :src="item.image" alt="image produit" />
            </div>
            <div class="col col-1">{{ item.title }}</div>
            <div class="col col-1">{{ item.price }} €</div>
            <div class="col col-2">
              <router-link :to="`/product/${item._id}`"
                >Voir le produit</router-link
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
    <h2 v-else>Vous n'avez aucune commande.</h2>
  </div>
</template>

<script>
import Button from "../../components/tools/Button";
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
.orders {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0px 200px 100px 200px;
  .info-order {
    grid-column: 1 / span 2;
    text-align: left;
    border-bottom: 1px solid rgb(172, 172, 172);
    margin: 30px;
  }
}
.responsive-table {
  grid-column: 3 / span 2;
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