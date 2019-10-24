<template>
  <div class="container">
    <div id="fb-root"></div>

    <a href="https://mediage.org/votematch/miya2019/">
      <div class="miya2019">
        <img src="/votematch/sen2019/images/votematch_hp_02_ol.jpg" alt="宮城県議選ボートマッチ">
        <h3>2019 宮城県議選ボートマッチはこちら</h3>
      </div>
    </a>

    <div class="head-description">
      <h3>アンケートに答えると、<br>あなたと候補者の意見の一致度がわかります！</h3>
      <p><br>令和元年8月25日(日)投開票予定<br>仙台市議会議員一般選挙<br>ボートマッチ</p>
      <el-button type="danger" plain @click="dialogVisible = true">ボートマッチとは？</el-button>
      <p><br>現時点でアンケートに回答いただいた<br>{{collectionStatus.already}}名の候補者の方とのマッチ率を測定します。</p>
      <el-button type="info" plain @click="dialogVisible2 = true">候補者のアンケート回答状況</el-button>
      <sns-share-buttons title="title"/>
      <what-vote-match v-model="dialogVisible"/>
      <answer-situation v-model="dialogVisible2"/>
    </div>

    <h4>◯ 最初に、あなたの選挙区を選んでください</h4>
    <area-question-radio
      v-model="form.area"
      :areas="areas"
    />

    <h4>◯ あなたが政治に求める指向・信条についてお聞きします</h4>
    <small-description>それぞれの設問について、２つの選択肢（文章）のうち、よりご自身の考え方に近いと感じるものを選んでください（完全に一致しなくても、なるべく近い考えを選んでください）。
    </small-description>
    <policy-question-radio
      v-for="(questionIdea, i) in questions.idea"
      v-model="form.idea[i]"
      :question="questionIdea"
      :key="`idea${i}`"
    />

    <h4>◯ 次に、具体的な政策についてお聞きします</h4>
    <small-description>仙台市の政策、取り組みに関する質問です。
      「無回答（わからない）」を選んだ場合、有権者とあなたとのマッチ率が減少する場合がありますので、完全に意見が一致しなくても、なるべく近い考えを選んでください。
    </small-description>
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
        <li v-show="error" v-for="error in validationErrors" :key="error">{{error}}</li>
      </ul>
      <div>
        <nuxt-link :to="{ name: 'candidate-answers' }">診断せずに候補者の回答を見る</nuxt-link>
      </div>
    </div>

    <div>
      <result
        v-if="result.length"
        :candidates="result"
        :ogp-id="ogpId"
      />
    </div>

    <make-share-ogp
      v-if="!!ogpId"
      :result="result"
      :uuid="ogpId"
    />
  </div>
</template>

<script>
  import PolicyQuestionRadio from "../components/PolicyQuestionRadio";
  import AreaQuestionRadio from "../components/AreaQuestionRadio";
  import PrimaryQuestionCheckbox from "../components/primaryQuestionCheckbox";
  import {db} from "~/plugins/firebase";
  import Result from "../components/Result";
  import SnsShareButtons from "../components/SnsShareButtons";
  import WhatVoteMatch from "../components/WhatVoteMatch";
  import MakeShareOgp from "../components/MakeShareOgp";
  import AnswerSituation from "../components/AnswerSituation";
  import SmallDescription from "../components/SmallDescription";

  export default {
    components: {
      SmallDescription,
      AnswerSituation,
      MakeShareOgp,
      WhatVoteMatch, SnsShareButtons, Result, PrimaryQuestionCheckbox, AreaQuestionRadio, PolicyQuestionRadio
    },
    head: {
      titleTemplate: null,
      title: '仙台市議選ボートマッチ2019',
      script: [
        {
          src: 'https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v4.0&appId=727427227437012&autoLogAppEvents=1',
          async: true,
          defer: true,
          crossorigin: "anonymous"
        }
      ]
    },
    data() {
      return {
        dialogVisible: false,
        dialogVisible2: false,
        questions: [],
        candidates: [],
        form: {
          area: null,
          idea: [],
          policy: [],
          primary: []
        },
        validationErrors: [],
        loading: false,
        result: [],
        isStore: false,
        checked: false,
        ogpId: null,
      }
    },
    asyncData({store}) {
      return {
        areas: store.getters['areas'],
        questions: store.getters['questions'],
        candidates: store.getters['candidates'],
        collectionStatus: store.getters['collectionStatus'],
      }
    },
    methods: {
      check() {
        this.clearErrors()

        if (this.validation()) {
          let result = []
          if (this.form.area === 'わからない、区に関わらず調べたい') {
            result = this.candidates.map(candidate => ({
              ...candidate,
              rate: this.rating(candidate)
            }));
          } else {
            result = this.candidates.filter(candidate => candidate.area === this.form.area)
                .map(candidate => ({
                  ...candidate,
                  rate: this.rating(candidate)
                }));
          }

          // rateの高い順に並び替え
          this.result = result.sort(function (a, b) {
            return b.rate - a.rate
          })

          this.$ga.event('vote-match', '回答', this.form.area, this.result[0].name)

          this.store()
          this.checked = true
          setTimeout(this.scrollToResult, 800)
        }
      },

      // マッチ度の計算
      rating(candidate) {
        let count = 0

        count += this.count(this.form.idea, candidate.q1)
        count += this.count(this.form.policy, candidate.q2)
        count += this.count(this.form.primary, candidate.q3)

        return count / (candidate.q1.length + candidate.q2.length + candidate.q3.length)
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

      scrollToResult() {
        this.$scrollTo('#result')
      },

      validation() {
        let response = true

        if (!this.form.area) {
          this.validationErrors.push('選挙区を選択してください')
          response = false
        }

        if (this.form.idea.length < this.candidates[0].q1.length) {
          this.validationErrors.push('Q1を全て選択してください')
          response = false
        } else {
          for (let i = 0; i < this.candidates[0].q1.length; i++) {
            if (!this.form.idea.hasOwnProperty(i)) {
              this.validationErrors.push('Q1を全て選択してください')
              break
            }
          }
        }

        if (this.form.policy.length < this.candidates[0].q2.length) {
          this.validationErrors.push('Q2を全て選択してください')
          response = false
        } else {
          for (let i = 0; i < this.candidates[0].q2.length; i++) {
            if (!this.form.policy.hasOwnProperty(i)) {
              this.validationErrors.push('Q2を全て選択してください')
              break
            }
          }
        }

        if (this.form.primary.length === 0) {
          this.validationErrors.push('特に重視する政策を選択してください')
          response = false
        }

        return response
      },

      clearErrors() {
        this.validationErrors = []
      },

      store() {
        // firestoreにデータを保存
        const answer = {
          area: this.form.area,
          idea: this.form.idea,
          policy: this.form.policy,
          primary: this.form.primary,
          createdAt: new Date()
        }

        const answersRef = db.collection('answers')
        if (!this.isStore) {
          answersRef.add(answer)
              .then(docRef => {
                this.ogpId = docRef._key.path.segments[1]
                this.isStore = true
              })
              .catch(error => {
                console.error("Error adding document: ", error)
              })
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .container {
    margin: 0 auto 30px;
    padding: 0 15px;
    max-width: 480px;
  }

  .head-description {
    text-align: center;
    margin: 30px 0 45px;

    h3 {
      font-size: 15px;
    }

    button {
      margin: 20px 0;
    }
  }

  h4 {
    margin-bottom: 16px;
    color: $primary-text;
    border-bottom: solid 1px;
  }

  .area-question-radio, .policy-question {
    margin-bottom: 40px;
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

  .miya2019 {
    text-align: center;
    margin: 30px 0;
    border: solid 3px darkred;
  }
</style>
