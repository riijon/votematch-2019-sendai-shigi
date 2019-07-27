<template>
  <div class="container">
    <h2>最初に、あなたの選挙区を選んでください</h2>
    <el-radio-group v-model="form.address">
      <el-radio
        v-for="(area, i) in areas"
        :label="i"
        :key="area"
      >{{area}}
      </el-radio>
    </el-radio-group>

    <h2>あなたが政治に求める指向・信条についてお聞きします</h2>
    <policy-question-radio
      v-for="(questionIdea, i) in questions.idea"
      v-model="form.idea[i]"
      :question="questionIdea"
      :key="`idea${i}`"
    />

    <h2>次に、具体的な政策についてお聞きします</h2>
    <policy-question-radio
      v-for="(questionPolicy, i) in questions.policy"
      v-model="form.policy[i]"
      :question="questionPolicy"
      :key="`policy${i}`"
    />

    <el-button type="primary" :loading="loading" @click="check">診断する</el-button>

    <pre>{{result}}</pre>
  </div>
</template>

<script>
  import PolicyQuestionRadio from "../components/PolicyQuestionRadio";

  export default {
    components: {PolicyQuestionRadio},
    data() {
      return {
        questions: [],
        candidates: [],
        form: {
          area: null,
          idea: [],
          policy: []
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
  }
</style>
