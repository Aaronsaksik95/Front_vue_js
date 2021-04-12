<template>
  <div>
    <div v-if="products.length != 0">
      <div class="title">
        <TitlePage :title="genre" />
        <TitlePage title="|" />
        <TitlePage :title="category" />
      </div>

      <div class="categ-product">
        <FilterCategories class="filter-categ" />
        <ProductsGrid :productArray="products" :detail="true" class="grid-prod" />
      </div>
    </div>
    <div v-else>
      <TitlePage :title="`Aucun resultat avec la catégorie ${category}.`" />
    </div>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import ApiProducts from "../../mixins/ApiProducts";
import ProductsGrid from "../../components/product/ProductGrid";
import FilterCategories from "../../components/product/FilterCategories";
export default {
  data: function () {
    return {
      products: [],
      genre: this.$route.params.genre,
      category: this.$route.params.category,
    };
  },
  components: {
    TitlePage,
    ProductsGrid,
    FilterCategories,
  },
  mixins: [ApiProducts],
  created() {
    this.get_products_category(this.genre, this.category)
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.log(err));
  },
};
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
}
.categ-product {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  .filter-categ {
    grid-column: 1;
  }
  .grid-prod {
    grid-column: 2 / span 10;
  }
}
</style>
