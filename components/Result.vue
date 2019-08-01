<template>
  <div>
    <p>あなたにオススメの候補者は...</p>
    <el-row>
      <el-col
        v-for="(candidate, index) in candidates"
        :key="candidates.id"
        :xs="24" :md="8"
      >
        <result-candidate-card :candidate="candidate" :ranking="index + 1" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ResultCandidateCard from "./ResultCandidateCard";
  export default {
    name: "Result",
    components: {ResultCandidateCard},
    props: {
      candidates: {
        type: Array,
        required: true
      },
    },
  }
</script>

<style scoped lang="scss">
  .el-col {
    margin-bottom: 45px;
  }
</style>
