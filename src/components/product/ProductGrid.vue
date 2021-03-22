<template>
  <div>
    <div v-for="item in productArray" :key="item._id">
      <ProductItem :productObject="item" />
    </div>
  </div>
</template>

<script>
import ProductItem from "./ProductItem"
export default {
  components: {
    ProductItem,
  },
  props: {
    productArray: {
        required: true,
        type: Array
    }
  },
  data: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>