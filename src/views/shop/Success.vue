<template>
  <div class="success">
    <h1>Félicitation votre commande a bien été éffectué.</h1>
    <router-link to="/orders">Mes commandes</router-link>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import ApiOrders from "../../mixins/ApiOrders";
import Cart from "../../mixins/Cart";
export default {
  components: {
    TitlePage,
  },
  mixins: [ApiOrders, Cart],
  created() {
    this.order(this.get_cart(), this.getTotal);
  },
  computed: {
    getTotal: function () {
      return this.get_total(this.get_cart());
    },
  },
};
</script>

<style lang="scss" scoped>
.success {
  color: #39cdd8;
}
a {
  color: black;
  font-weight: bold;
}
</style>