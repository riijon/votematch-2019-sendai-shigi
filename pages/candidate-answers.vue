<template>
  <div>
    <template v-for="idea in ideaAnswers">
      <h4 :key="idea.title">{{idea.title}}</h4>
      <el-table
        :data="idea.candidateAnswers"
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
      const questions = store.getters['questions']
      const candidates = store.getters['candidates']
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

      return {
        candidates: candidates,
        ideaAnswers: ideaAnswers,
      }
    }
  }
</script>

<style scoped>

</style>
