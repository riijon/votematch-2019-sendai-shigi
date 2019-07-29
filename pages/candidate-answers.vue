<template>
  <div>
    <template v-for="idea in ideaAnswers">
      <h4 :key="idea.title">{{idea.title}}</h4>
      <el-table
        :data="idea.answers"
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="question"
          label="質問"
          width="150">
        </el-table-column>
        <el-table-column
          fixed
          v-for="candidate in candidates"
          :key="candidate.id"
          :prop="candidate.id.toString()"
          :label="candidate.name"
          width="100">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  export default {
    asyncData({store}) {
      return {
        candidates: store.getters['candidates']
      }
    },
    data() {
      return {
        ideaAnswers: [
          {
            title: '経済の活性化について',
            answers: [
              {
                question: '福祉の充実、雇用対策など、行政主導で経済を活性化させる',
                "1": '○',
                "2": ''
              }, {
                question: '税は安く、厳しいルールは撤廃して、民間の自由な取引で経済を活性化させる',
                "1": '',
                "2": '○'
              }, {
                question: 'どちらとも言えない',
                "1": '',
                "2": ''
              }
            ]
          },
          {
            title: '男女の権利について',
            answers: [
              {
                question: '男性も女性も、まったく同じ権利を得るべき',
                "1": '○',
                "2": '○'
              }, {
                question: '性差に合わせた、柔軟な権利を得るべき',
                "1": '',
                "2": ''
              }, {
                question: 'どちらとも言えない',
                "1": '',
                "2": ''
              }
            ]
          }
        ]
      }
    },
  }
</script>

<style scoped>

</style>
