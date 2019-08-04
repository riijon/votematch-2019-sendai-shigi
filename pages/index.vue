<template>
  <div class="container">
    <h4>◯ 最初に、あなたの選挙区を選んでください</h4>
    <area-question-radio
      v-model="form.area"
      :areas="areas"
    />

    <h4>◯ あなたが政治に求める指向・信条についてお聞きします</h4>
    <policy-question-radio
      v-for="(questionIdea, i) in questions.idea"
      v-model="form.idea[i]"
      :question="questionIdea"
      :key="`idea${i}`"
    />

    <h4>◯ 次に、具体的な政策についてお聞きします</h4>
    <policy-question-radio
      v-for="(questionPolicy, i) in questions.policy"
      v-model="form.policy[i]"
      :question="questionPolicy"
      :key="`policy${i}`"
    />

    <h4>◯ 最後に、あなたが仙台市議会に求める「特に重視する政策」を、３つまで選んでください</h4>
    <primary-question-checkbox
      v-model="form.primary"
      :primary-policies="questions.primary"
    />

    <div class="check">
      <el-button type="primary" :loading="loading" @click="check">診断する</el-button>
      <ul class="errors">
        <li v-if="error" v-for="error in errors" :key="error">{{error}}</li>
      </ul>
      <div>
        <nuxt-link :to="{ name: 'candidate-answers' }">診断せずに候補者の回答を見る</nuxt-link>
      </div>
    </div>

    <div>
      <result :candidates="result" v-if="result.length"/>
    </div>
  </div>
</template>

<script>
  import PolicyQuestionRadio from "../components/PolicyQuestionRadio";
  import AreaQuestionRadio from "../components/AreaQuestionRadio";
  import PrimaryQuestionCheckbox from "../components/primaryQuestionCheckbox";
  import {db} from "~/plugins/firebase";
  import Result from "../components/Result";

  export default {
    components: {Result, PrimaryQuestionCheckbox, AreaQuestionRadio, PolicyQuestionRadio},
    data() {
      return {
        questions: [],
        candidates: [],
        form: {
          area: null,
          idea: [],
          policy: [],
          primary: []
        },
        errors: {
          area: null,
          idea: null,
          policy: null,
          primary: null
        },
        loading: false,
        result: [],
        isStore: false,
        checked: false
      }
    },
    asyncData({store}) {
      return {
        areas: store.getters['areas'],
        questions: store.getters['questions'],
        candidates: store.getters['candidates'],
      }
    },
    methods: {
      check() {
        const result = []
        this.clearValidation()

        if (this.validation()) {
          this.candidates.forEach(candidate => {
            let count = 0

            count += this.count(this.form.idea, candidate.q1)
            count += this.count(this.form.policy, candidate.q2)
            count += this.count(this.form.primary, candidate.q3)

            const rate = count / (candidate.q1.length + candidate.q2.length + candidate.q3.length)

            result.push({
              ...candidate,
              rate: rate
            })
          })

          // rateの高い順に並び替え
          this.result = result.sort(function (a, b) {
            return b.rate - a.rate
          })

          this.store()
          this.checked = true
          setTimeout(this.scroll, 500)
        }
      },

      // 利用者と候補者の回答を比較しマッチ数を返す
      count(formAnswers, candidateAnswers) {
        let count = 0
        for (let i = 0; i < candidateAnswers.length; i++) {
          if (formAnswers[i] === candidateAnswers[i]) {
            count++
          }
        }
        return count
      },

      scroll() {
        this.$scrollTo('#result')
      },

      validation() {
        let response = true
        if (!this.form.area) {
          this.errors.area = '選挙区を選択してください'
          response = false
        }

        if (this.form.idea.length < 7) {
          this.errors.idea = 'Q1を全て選択してください'
          response = false
        }

        if (this.form.policy.length < 11) {
          this.errors.policy = 'Q2を全て選択してください'
          response = false
        }

        if (this.form.primary.length < 3) {
          this.errors.primary = 'Q3を全て選択してください'
          response = false
        }

        return response
      },

      clearValidation() {
        this.errors = {
          area: null,
          idea: null,
          policy: null,
          primary: null
        }
      },

      store() {
        // firestoreにデータを保存
        const answer = {
          area: this.form.area,
          idea: this.form.idea,
          policy: this.form.policy,
          primary: this.form.primary
        }
        const answersRef = db.collection('answers')
        if (!this.isStore) {
          answersRef.add(answer)
          this.isStore = true
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .container {
    margin: 0 auto 30px;
    padding: 0 15px;
  }

  h4 {
    margin-bottom: 16px;
    color: $primary-text;
  }

  .area-question-radio, .policy-question {
    margin-bottom: 32px;
  }

  .check {
    margin: 45px auto 60px;
    text-align: center;
    color: #606266;
    font-weight: 500;
    font-size: 14px;

    button {
      margin-bottom: 10px;
    }
  }

  .errors {
    li {
      margin-bottom: 8px;
      color: $danger;
    }
  }
</style>
