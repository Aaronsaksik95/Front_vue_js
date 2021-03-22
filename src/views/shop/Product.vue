<template>
  <div>
    <ProductDetail :productObject="product" />
  </div>
</template>

<script>
import TitlePage from "../../components/TitlePage";
import ProductDetail from "../../components/product/ProductDetail";
import ApiProducts from '../../mixins/ApiProducts';

export default {
  name: "Product",
  components: {
    TitlePage,
    ProductDetail,
  },
  data: function () {
    return {
      myTitle: "Page shops",
      product: [],
    };
  },
  mixins: [ApiProducts],
  created() {
    this.getProduct(this.$route.params.id)
      .then((data) => {
        this.product = data.product;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
</style>