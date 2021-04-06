<template>
  <div>
    <TitlePage :title="myTitle" />
    <div>
      <!-- <select name="categories" id="">
        <option
          v-for="item in categories"
          :key="item._id"
          @focus="() => chooseCategory(item.title)"
        >
          {{ item.title }}
        </option>
      </select> -->
    </div>
    <div class="search__content">
      <ProductsGrid :productArray="filteredShop" />
    </div>
  </div>
</template>

<script>
import TitlePage from "../components/TitlePage";
import ProductsGrid from "../components/product/ProductGrid";
import ApiProducts from "../mixins/ApiProducts";
import ApiCategories from "../mixins/ApiCategories";

export default {
  name: "Shops",
  components: {
    TitlePage,
    ProductsGrid,
  },
  data: function () {
    return {
      myTitle: "Page shops",
      products: [],
      searchValue: "",
      categories: [],
    };
  },
  computed: {
    filteredShop: function () {
      let filter = new RegExp(this.searchValue, "i");
      return this.products.filter((item) => item.title.match(filter));
    },
  },
  mixins: [ApiProducts, ApiCategories],
  created() {
    this.get_products()
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.log(err));

    this.get_categories().then((data) => {
      this.categories = data.categories;
    });
  },
  methods: {
    chooseCategory(title) {
      console.log("coucou")
      this.get_product_category(title).then((data) => {
        this.products = data.products;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>