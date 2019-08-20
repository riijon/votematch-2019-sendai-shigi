<template>
  <p class="small-description">
    <slot></slot>
  </p>
</template>

<script>
  export default {
    name: "SmallDescription"
  }
</script>

<style scoped lang="scss">
  .small-description {
    font-size: 10px;
    margin-bottom: 16px;
    color: $secondary-text;
  }
</style>
