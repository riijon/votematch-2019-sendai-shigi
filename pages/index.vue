<template>
  <div class="container">
<!--    <h2>あなたが政治に求める指向・信条についてお聞きします</h2>-->
    <policy-question-radio
      v-for="(question, i) in questions"
      v-model="form.idea[i]"
      :question="question"
      :key="i"
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
        address: null,
        idea: [],
        policy: []
      },
      loading: false,
      result: [],
    }
  },
  asyncData({store}) {
    return {
      questions: store.getters['questions'].idea,
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

        const rate = count / candidate.q1.length

        result.push({
          name: candidate.name,
          rate: rate
        })
      })

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
