<template>
  <div>
      <HeaderAdmin />
    <div class="search__form">
      <input type="text" v-model="searchValue" />
    </div>
    <table class="table w-50 mx-auto">
      <thead>
        <tr>
          <th scope="col">title</th>
          <th scope="col">image</th>
          <th scope="col">description</th>
          <th scope="col">price</th>
          <th scope="col">categories</th>
          <th scope="col">Supprimer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredShop" :key="item._id">
          <th>{{ item.title }}</th>
          <td>
            <img class="img" :src="item.image" alt="image produit" />
          </td>
          <td>{{ item.description }}</td>
          <td>{{ item.price }} €</td>
          <td>
            <select>
              <option v-for="i in item.categories" :key="i._id">
                {{ i.title }}
              </option>
            </select>
          </td>
          <td>
            <Button
              class="btn btn-red"
              btnText="Supprimer"
              :btnFunction="() => deleteProducts(item._id)"
            />
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
import HeaderAdmin from "../../layout/HeaderAdmin"

export default {
  name: "Shops",
  components: {
    TitlePage,
    ProductsGrid,
    Button,
    HeaderAdmin
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
    this.getProducts()
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    deleteProducts(id) {
      this.delete_products(id).catch((err) => console.log(err));
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