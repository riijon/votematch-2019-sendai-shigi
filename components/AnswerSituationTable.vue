<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="名前"
      width="100">
    </el-table-column>
    <el-table-column
      prop="party"
      label="政党"
    >
    </el-table-column>
    <el-table-column
      prop="situation"
      label="回答状況">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "AnswerSituationTable",
    props: {
      tableData: {
        type: Array,
        required: true
      },
    },
  }
</script>

<style scoped lang="scss">

</style>
