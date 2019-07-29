<template>
  <div>
    <p>あなたにオススメの候補者は...</p>
    <el-row>
      <el-col
        v-for="candidate in candidates"
        :key="candidates.id"
        :xs="24" :md="8"
      >
        <result-candidate-card :candidate="candidate" />
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

<style scoped>

</style>
