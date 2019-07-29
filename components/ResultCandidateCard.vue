<template>
  <div class="result-candidate-card">
    <div>
      <el-image
        style="width: 100px; height: 100px"
        :src="'/images/candidates/' + candidate.image"
      ></el-image>
    </div>
    <div>
      <ul>
        <li>{{candidate.hurigana}}</li>
        <li>{{candidate.name}}</li>
        <li>あなたとのマッチ度：{{candidate.rate | percent}}%</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ResultCandidateCard",
    props: {
      candidate: {
        type: Object,
        required: true
      },
    }
  }
</script>

<style scoped lang="scss">
  .result-candidate-card {
    display: flex;
  }
</style>
