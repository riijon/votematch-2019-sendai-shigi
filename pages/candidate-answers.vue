<template>
  <div class="candidate-answers">
    <template v-for="(idea, index) in ideaAnswers">
      <h4 :key="idea.title">{{idea.title}}</h4>
      <el-table
        :data="idea.candidateAnswers"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="question"
          label="質問"
          width="150">
        </el-table-column>
        <el-table-column
          v-for="candidate in candidates"
          :key="candidate.id"
          :prop="candidate.id.toString()"
          :label="candidate.name"
          align="center"
          width="100">
        </el-table-column>
      </el-table>
    </template>
    <template v-for="policy in policyAnswers">
      <h4 :key="policy.title">{{policy.title}}</h4>
      <el-table
        :data="policy.candidateAnswers"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="question"
          label="質問"
          width="150">
        </el-table-column>
        <el-table-column
          v-for="candidate in candidates"
          :key="candidate.id"
          :prop="candidate.id.toString()"
          :label="candidate.name"
          align="center"
          width="100">
        </el-table-column>
      </el-table>
    </template>
    <template>
      <h4>優先政策</h4>
      <el-table
        :data="primaryAnswers"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="question"
          label="質問"
          width="150">
        </el-table-column>
        <el-table-column
          v-for="candidate in candidates"
          :key="candidate.id"
          :prop="candidate.id.toString()"
          :label="candidate.name"
          align="center"
          width="100">
        </el-table-column>
      </el-table>
    </template>
    <div class="back-top">
      <nuxt-link :to="{ name: 'index' }">
        <el-button type="info">ボートマッチトップへ戻る</el-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    head: {
      title: '候補者の回答'
    },

    asyncData({store}) {
      const questions = store.getters['questions']
      const candidates = store.getters['candidates']
      // 政治志向についての回答を整形
      const ideaAnswers = questions.idea.map((question, questionsIndex) => {
        const candidateAnswers = question.answers.map((answer, answersIndex) => {
          let candidateAnswer = {
            question: answer
          }
          candidates.map(candidate => {
            candidateAnswer[`${candidate.id}`] = candidate.q1[questionsIndex] === answersIndex ? '○' : '';
          })
          return candidateAnswer
        })

        return {
          title: question.title,
          candidateAnswers: candidateAnswers
        }
      })

      // 政策についての回答を整形
      const policyAnswers = questions.policy.map((question, questionsIndex) => {
        const candidateAnswers = question.answers.map((answer, answersIndex) => {
          let candidateAnswer = {
            question: answer
          }
          candidates.map(candidate => {
            candidateAnswer[`${candidate.id}`] = candidate.q2[questionsIndex] === answersIndex ? '○' : '';
          })
          return candidateAnswer
        })

        return {
          title: question.title,
          candidateAnswers: candidateAnswers
        }
      })

      // 優先政策についての回答を整形
      const primaryAnswers = questions.primary.map((question, questionsIndex) => {
        let candidateAnswer = {}
        candidates.map(candidate => {
          const a = candidate.q3.some(answer => answer === questionsIndex)
          candidateAnswer[`${candidate.id}`] = a ? '○' : '';
        })

        return {
          question: question,
          ...candidateAnswer
        }
      })

      return {
        candidates: candidates,
        ideaAnswers: ideaAnswers,
        policyAnswers: policyAnswers,
        primaryAnswers: primaryAnswers,
      }
    }
  }
</script>

<style scoped lang="scss">
  .candidate-answers {
    margin: 30px 0 0;
    padding-left: 15px;
  }

  .el-table {
    margin-bottom: 60px;
  }

  .back-top {
    text-align: center;
    margin-bottom: 60px;
  }
</style>
