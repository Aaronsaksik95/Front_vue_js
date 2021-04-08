<template>
  <div>
    <HeaderAdmin />
    <div class="search__form">
      <input type="text" v-model="searchValue" />
    </div>
    <table class="table w-50 mx-auto">
      <thead>
        <tr>
          <th scope="col">Status</th>
          <th scope="col">Total</th>
          <th scope="col">Prénom</th>
          <th scope="col">Nom</th>
          <th scope="col">Email</th>
          <th scope="col">date</th>
          <th scope="col">Produit</th>
          <th scope="col">Supprimer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredOrders" :key="item._id">
          <th>{{ item.status }}</th>
          <td>{{ item.total }} €</td>
          <td>{{ item.user.firstName }}</td>
          <td>{{ item.user.lastName }}</td>
          <td>{{ item.user.email }}</td>
          <td>{{ item.date }}</td>
          <td>
            <select>
              <option v-for="i in item.products" :key="i._id">
                {{ i.title }}
              </option>
            </select>
          </td>
          <td>
            <Button
              class="btn btn-red"
              btnText="Supprimer"
              :btnFunction="() => deleteOrder(item._id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import ApiProducts from "../../mixins/ApiProducts";
import Button from "../../components/tools/Button";
import HeaderAdmin from "../../layout/HeaderAdmin";
import ApiOrders from "../../mixins/ApiOrders";

export default {
  name: "Shops",
  components: {
    TitlePage,
    Button,
    HeaderAdmin,
  },
  data: function () {
    return {
      myTitle: "Produits",
      orders: [],
      searchValue: "",
    };
  },
  computed: {
    filteredOrders: function () {
      let filter = new RegExp(this.searchValue, "i");
      return this.orders.filter((item) => item.user.lastName.match(filter));
    },
  },
  mixins: [ApiProducts, ApiOrders],
  created() {
    this.get_orders()
      .then((data) => {
        this.orders = data.orders;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    deleteOrder(id) {
      this.delete_order(id).catch((err) => console.log(err));
      document.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.img {
  width: 50px;
}
</style>