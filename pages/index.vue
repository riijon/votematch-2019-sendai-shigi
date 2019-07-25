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
      <el-checkbox v-model="checked">Option</el-checkbox>
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
  text-align: center;
}
</style>
