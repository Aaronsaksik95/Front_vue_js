<template>
  <div class="form-input">
    <label class="label-input" for="text">{{ label }}</label>
    <input
      @input="handleInput"
    />
  </div>
</template>

<script>
export default {
  name: "Button",
  props: ['value'],
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit('input', this.content);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-input {
  font-size: 20px;

  margin: 10px;
  .label-input {
    display: block;
  }
  .input-text {
    border-radius: 10px;
    height: 35px;
    width: 250px;
    border: 1px solid rgb(95, 95, 95);
    text-indent: 3px;
  }
}
</style>