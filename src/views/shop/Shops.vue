<template>
  <div>
    <TitlePage :title="myTitle" />
    <ProduitGrid :productArray="products" />
  </div>
</template>

<script>
import TitlePage from "../../components/TitlePage";
import ProduitGrid from "../../components/product/ProductGrid";
import ApiProducts from '../../mixins/ApiProducts';

export default {
  name: "Shops",
  components: {
    TitlePage,
    ProduitGrid,
  },
  data: function () {
    return {
      myTitle: "Page shops",
      products: [],
    };
  },
  mixins:[ApiProducts],
  created() {
    this.getProducts()
      .then((data) => {
        this.products = data.products;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
</style>