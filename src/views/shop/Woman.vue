<template>
  <div class="woman">
    <TitlePage :title="genre" />
    <div class="search__content">
      <ProductsGrid :productArray="products" />
    </div>
  </div>
</template>

<script>
import TitlePage from "../../components/tools/TitlePage";
import ApiProducts from "../../mixins/ApiProducts";
import ProductsGrid from "../../components/product/ProductGrid";
export default {
  name: "Woman",
  data: function () {
    return {
      products: [],
      genre: "femme"
    };
  },
  components: {
    TitlePage,
    ProductsGrid,
  },
  mixins: [ApiProducts],
  created() {
    this.get_products_genre(this.genre)
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.log(err));
  },
  
  // updated() {
  //   this.get_products_genre(this.genre)
  //     .then((data) => {
  //       this.products = data.products;
  //     })
  //     .catch((err) => console.log(err));
  // },
};
</script>
