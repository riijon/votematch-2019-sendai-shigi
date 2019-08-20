<template>
  <p class="small-description"><slot></slot></p>
</template>

<script>
  export default {
    name: "SmallDescription"
  }
</script>

<style scoped lang="scss">
  p {
    font-size: 10px;
    margin-bottom: 16px;
    color: $secondary-text;
  }
</style>
