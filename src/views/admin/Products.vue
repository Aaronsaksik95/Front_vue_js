<template>
  <div>
    <HeaderAdmin />
    <div class="search__form">
      <input type="text" v-model="searchValue" />
    </div>
    <table class="table w-50 mx-auto">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">title</th>
          <th scope="col">genre</th>
          <th scope="col">image</th>
          <th scope="col">description</th>
          <th scope="col">price</th>
          <th scope="col">categories</th>
          <th scope="col">Supprimer</th>
          <th scope="col">Modifier</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredShop" :key="item._id">
          <th>{{ item._id }}</th>
          <th>{{ item.title }}</th>
          <th>{{ item.genre }}</th>
          <td>
            <img class="img" :src="item.image" alt="image produit" />
          </td>
          <td>{{ item.description }}</td>
          <td>{{ item.price }} €</td>
          <td>
            <select>
              <option v-for="i in item.categories" :key="i.title">
                {{ i.title }}
              </option>
            </select>
          </td>
          <td>
            <Button
              class="btn btn-red"
              btnText="Supprimer"
              :btnFunction="() => deleteProduct(item._id)"
            />
          </td>
          <td>
            <router-link
              class="btn btn-warning"
              :to="`./updateProduct/${item._id}`"
              >Modifier</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TitlePage from "../../components/TitlePage";
import ProductsGrid from "../../components/product/ProductGrid";
import ApiProducts from "../../mixins/ApiProducts";
import Button from "../../components/Button";
import HeaderAdmin from "../../layout/HeaderAdmin";

export default {
  name: "Shops",
  components: {
    TitlePage,
    ProductsGrid,
    Button,
    HeaderAdmin,
  },
  data: function () {
    return {
      myTitle: "Produits",
      products: [],
      searchValue: "",
    };
  },
  computed: {
    filteredShop: function () {
      let filter = new RegExp(this.searchValue, "i");
      return this.products.filter((item) => item.title.match(filter));
    },
  },
  mixins: [ApiProducts],
  created() {
    this.get_products()
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    deleteProduct(id) {
      this.delete_product(id).catch((err) => console.log(err));
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