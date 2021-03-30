<template>
  <div>
    <TitlePage :title="myTitle" />
    <div class="search__form">
      <input type="text" v-model="searchValue"/>
    </div> 
    <div class="search__content">
      <ProductsGrid :productArray="filteredShop"/>
    </div>
  </div>
</template>

<script>
import TitlePage from "../../components/TitlePage";
import ProductsGrid from "../../components/product/ProductGrid";
import ApiProducts from '../../mixins/ApiProducts';

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
      searchValue:"",
    };
  },
  computed: {
    filteredShop: function() {
      let filter = new RegExp(this.searchValue, "i");
      return this.products.filter(item=>item.title.match(filter));
    }
  },
  mixins:[ApiProducts],
  created() {
    this.get_products()
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
</style>