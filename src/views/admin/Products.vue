<template>
  <div>
    <HeaderAdmin />
    <div class="search__form">
      <input
        type="text"
        v-model="searchValue"
        placeholder="Recherche un produit..."
      />
    </div>
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1">Image</div>
        <div class="col col-1">Id</div>
        <div class="col col-1">Titre</div>
        <div class="col col-1">Genre</div>
        <div class="col col-1">Price</div>
        <div class="col col-1">Categories</div>
        <div class="col col-1">Supprimer</div>
        <div class="col col-1">Modifier</div>
      </li>
      <li class="table-row" v-for="item in filteredShop" :key="item._id">
        <div class="col col-1">
          <img class="img-produits" :src="item.image" alt="image produit" />
        </div>
        <div class="col col-1 id">{{ item._id }}</div>
        <div class="col col-1">{{ item.title }}</div>
        <div class="col col-1">{{ item.genre }}</div>

        <div class="col col-1">{{ item.price }} €</div>
        <div class="col col-1">
          <select>
            <option v-for="i in item.categories" :key="i.title">
              {{ i.title }}
            </option>
          </select>
        </div>

        <div class="col col-1">
          <Button
            class="btn btn-red"
            btnText="Supprimer"
            :btnFunction="() => deleteProduct(item._id)"
          />
        </div>
        <div class="col col-1">
          <router-link
            class="btn btn-warning"
            :to="`./updateProduct/${item._id}`"
            >Modifier</router-link
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import ProductsGrid from "../../components/product/ProductGrid";
import ApiProducts from "../../mixins/ApiProducts";
import Button from "../../components/tools/Button";
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
.search__form {
  input {
    width: 200px;
    margin: auto;
  }
}
.responsive-table {
  width: 90%;
  margin: 20px auto;
  li {
    border-radius: 10px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .img-produits {
      width: 100%;
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
  .id{
    font-size: 10px;
  }
  .col-1 {
    flex-basis: 10%;
  }
  select{
    width: 100px;
  }
}
</style>