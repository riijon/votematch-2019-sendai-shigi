<template>
  <div class="candidate-answers">
    <h4>候補者の回答一覧</h4>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">全て</el-menu-item>
      <el-menu-item index="青葉区">青葉区</el-menu-item>
      <el-menu-item index="泉区">泉区</el-menu-item>
      <el-menu-item index="太白区">太白区</el-menu-item>
      <el-menu-item index="宮城野区">宮城野区</el-menu-item>
      <el-menu-item index="若林区">若林区</el-menu-item>
    </el-menu>

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
          width="150">
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
          width="150">
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
    data() {
      return {
        activeIndex: '1',
        questions: [],
        candidates: [],
        baseCandidates: [],
        meta: {
          title: '候補者の回答',
          description: '候補者の回答を一覧で見れます。',
          type: 'article',
          url: 'https://mediage.org/votematch/sen2019/candidate-answers',
          image: 'https://mediage.org/votematch/sen2019/images/og-image.jpg',
        },
      }
    },

    head () {
      return {
        title: this.meta.title,
        meta: [
          { hid: 'description', name: 'description', content: this.meta.description },
          { hid: 'og:type', property: 'og:type', content: this.meta.type },
          { hid: 'og:title', property: 'og:title', content: this.meta.title + ' - 仙台市議選ボートマッチ2019' },
          { hid: 'og:description', property: 'og:description', content: this.meta.description },
          { hid: 'og:url', property: 'og:url', content: this.meta.url },
          { hid: 'og:image', property: 'og:image', content: this.meta.image },
        ],
      }
    },

    asyncData({store}) {
      const questions = store.getters['questions']
      const candidates = store.getters['candidates']

      return {
        questions: questions,
        candidates: candidates,
        baseCandidates: candidates,
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key);
        if (key === '1') {
          this.candidates = this.baseCandidates
          return
        }

        this.candidates = this.baseCandidates.filter(candidate => {
          return candidate.area === key
        })
      }
    },

    computed: {
      ideaAnswers() {
        // 政治志向についての回答を整形
        return this.questions.idea.map((question, questionsIndex) => {
          const candidateAnswers = question.answers.map((answer, answersIndex) => {
            let candidateAnswer = {
              question: answer
            }
            this.candidates.map(candidate => {
              candidateAnswer[`${candidate.id}`] = candidate.q1[questionsIndex] === answersIndex ? '○' : '';
            })
            return candidateAnswer
          })

          // 補足
          const comments = {
            question: '補足',
          }

          this.candidates.map(candidate => {
            comments[`${candidate.id}`] = candidate[`Q1-${questionsIndex + 1}`];
          })

          candidateAnswers.push(comments)

          return {
            title: question.title,
            candidateAnswers: candidateAnswers
          }
        })
      },
      policyAnswers() {
        // 政策についての回答を整形
        return this.questions.policy.map((question, questionsIndex) => {
          const candidateAnswers = question.answers.map((answer, answersIndex) => {
            let candidateAnswer = {
              question: answer
            }
            this.candidates.map(candidate => {
              candidateAnswer[`${candidate.id}`] = candidate.q2[questionsIndex] === answersIndex ? '○' : '';
            })
            return candidateAnswer
          })

          // 補足
          const comments = {
            question: '補足',
          }

          this.candidates.map(candidate => {
            comments[`${candidate.id}`] = candidate[`Q2-${questionsIndex + 1}`];
          })

          candidateAnswers.push(comments)

          return {
            title: question.title,
            candidateAnswers: candidateAnswers
          }
        })
      },
      primaryAnswers() {
        // 優先政策についての回答を整形
        return this.questions.primary.map((question, questionsIndex) => {
          let candidateAnswer = {}
          this.candidates.map(candidate => {
            const a = candidate.q3.some(answer => answer === questionsIndex)
            candidateAnswer[`${candidate.id}`] = a ? '○' : '';
          })

          return {
            question: question,
            ...candidateAnswer
          }
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  .el-menu {
    margin-bottom: 45px;
  }

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
