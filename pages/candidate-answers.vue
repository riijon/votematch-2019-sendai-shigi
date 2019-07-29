<template>
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
      <tr v-for="candidate in candidates" :key="candidate.id">
        <td>{{candidate.name}}</td>
        <td>{{candidate.hurigana}}</td>
        <td>{{candidate.q1}}</td>
        <td>{{candidate.q2}}</td>
        <td>{{candidate.q3}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    asyncData({store}) {
      return {
        candidates: store.getters['candidates']
      }
    },
  }
</script>

<style scoped>

</style>
