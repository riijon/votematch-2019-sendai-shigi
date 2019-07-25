<template>
  <div class="container">
    <div>
      <table>
        <thead>
        <tr>
          <th>名前</th>
          <th>ふりがな</th>
          <th>Q1</th>
          <th>Q2</th>
          <th>Q3</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="json in jsonAll" :key="json.id">
          <td>{{json.name}}</td>
          <td>{{json.hurigana}}</td>
          <td>{{json.q1}}</td>
          <td>{{json.q2}}</td>
          <td>{{json.q3}}</td>
        </tr>
        </tbody>
      </table>
      <h2 class="subtitle">
        My magnificent Nuxt.js project
      </h2>
      <el-checkbox v-model="checked">Option</el-checkbox>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      checked: false
    }
  },
  asyncData({store}) {
    return {
      jsonAll: store.getters['json/getAll']
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
