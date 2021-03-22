<template>
  <div>
    <TitlePage :title="myTitle" />
  </div>
</template>

<script>
import TitlePage from "../components/TitlePage";
export default {
  name: "About",
  components: {
    TitlePage,
  },
  data: function () {
    return {
      myTitle: "my Shop"
    };
  },
};
</script>

<style lang="scss" scoped>
</style>