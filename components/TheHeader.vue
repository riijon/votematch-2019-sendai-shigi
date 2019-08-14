<template>
  <header>
    <nuxt-link :to="{ name: 'index' }">
      <h2>
        SENDAI VOTE MATCH 2019 <img src="/votematch/sendaishigi-2019/images/favicon.svg" alt="vote">
      </h2>
    </nuxt-link>
  </header>
</template>

<script>
    export default {
        name: "TheHeader"
    }
</script>

<style scoped lang="scss">
  header {
    background-color: #2196F3;
    padding: 15px 0;
  }

  h2 {
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 300;
    font-size: 16px;
    text-align: center;
    color: #0D47A1;
    word-spacing: 5px;
    padding: 25px;
    background-color: #F5F3F3;

    img {
      width: 20px;
      vertical-align: bottom;
    }
  }

  a {
    text-decoration: none;
  }
</style>
