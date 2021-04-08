<template>
  <div class="product-grid">
    <div v-for="item in productArray" :key="item._id">
      <ProductItem :productObject="item" />
    </div>
  </div>
</template>

<script>
import ProductItem from "./ProductItem";
export default {
  components: {
    ProductItem,
  },
  props: {
    productArray: {
      required: true,
      type: Array,
    },
  },
  data: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  // margin: 20px;
}
</style>