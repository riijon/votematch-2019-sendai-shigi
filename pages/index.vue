<template>
  <div class="container">
    <h4>最初に、あなたの選挙区を選んでください</h4>
    <area-question-radio
      v-model="form.area"
      :areas="areas"
    />

    <h4>あなたが政治に求める指向・信条についてお聞きします</h4>
    <policy-question-radio
      v-for="(questionIdea, i) in questions.idea"
      v-model="form.idea[i]"
      :question="questionIdea"
      :key="`idea${i}`"
    />

    <h4>次に、具体的な政策についてお聞きします</h4>
    <policy-question-radio
      v-for="(questionPolicy, i) in questions.policy"
      v-model="form.policy[i]"
      :question="questionPolicy"
      :key="`policy${i}`"
    />

    <h4>最後に、あなたが仙台市議会に求める「特に重視する政策」を、３つまで選んでください</h4>
    <span>（選ばなかった政策を重視しないということではなく、最も重要と考えるものを３つ選んでください）</span>

    <primary-question-checkbox
      v-model="form.primary"
      :primary-policies="questions.primary"
    />

    <el-button type="primary" :loading="loading" @click="check">診断する</el-button>

    <pre>{{result}}</pre>
  </div>
</template>

<script>
  import PolicyQuestionRadio from "../components/PolicyQuestionRadio";
  import AreaQuestionRadio from "../components/AreaQuestionRadio";
  import PrimaryQuestionCheckbox from "../components/primaryQuestionCheckbox";

  export default {
    components: {PrimaryQuestionCheckbox, AreaQuestionRadio, PolicyQuestionRadio},
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
        loading: false,
        result: [],
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

        this.candidates.forEach(candidate => {
          let count = 0

          for (let i = 0; i < candidate.q1.length; i++) {
            if (this.form.idea[i] === candidate.q1[i]) {
              count++
            }
          }

          for (let i = 0; i < candidate.q2.length; i++) {
            if (this.form.policy[i] === candidate.q2[i]) {
              count++
            }
          }

          const rate = count / (candidate.q1.length + candidate.q2.length)

          result.push({
            name: candidate.name,
            rate: rate
          })
        })

        // rateの高い順に並び替え
        this.result = result.sort(function (a, b) {
          return b.rate - a.rate
        })
      }
    },
  }
</script>

<style>
  .container {
    margin: 0 auto;
    padding: 0 15px;
  }

  h4 {
    margin-bottom: 16px;
  }
</style>
