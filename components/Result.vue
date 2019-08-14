<template>
  <div id="result">
    <p>あなたにオススメの候補者は...</p>
    <el-row :gutter="5">
      <el-col
        v-for="(candidate, index) in displayCandidates"
        :key="candidates.id"
        :xs="24" :md="8"
      >
        <result-candidate-card :candidate="candidate" :ranking="index + 1"/>
      </el-col>
    </el-row>
    <el-row
      :gutter="5"
      class="more-candidates"
      :class="{ all: viewAll }"
      v-if="moreCandidates.length"
    >
      <el-button type="primary" plain @click="viewAll = true">全ての候補者を見る</el-button>
      <el-col
        v-for="(candidate, index) in moreCandidates"
        :key="candidates.id"
        :xs="24" :md="8"
      >
        <result-candidate-card :candidate="candidate" :ranking="index + firstDisplayCandidates + 1"/>
      </el-col>
    </el-row>
    <section class="end">
      <div class="share">
        <p>仙台市議選2019ボートマッチをシェアして、<br>選挙をもっと盛り上げよう！</p>
      </div>
      <div class="caution">
        <p>診断は機械的なものなので、意外な結果になるかもしれません。また、無回答を選んだ設問がある候補者はマッチ率が低く表示される傾向があります。</p>
        <p>表示された数字だけを参考にするのではなく、各候補者の主張に関心を持つ入り口にしていただたら、幸いです！</p>
      </div>
      <a class="returnTop" href="http://mediage.org/">メディアージのトップに戻る</a>
    </section>
  </div>
</template>

<script>
  import ResultCandidateCard from "./ResultCandidateCard";
  import SnsShareButtons from "./SnsShareButtons";
  import MakeShareOgp from "./MakeShareOgp";

  export default {
    name: "Result",
    components: {MakeShareOgp, SnsShareButtons, ResultCandidateCard},
    data() {
      return {
        firstDisplayCandidates: 5,
        viewAll: false
      }
    },
    props: {
      candidates: {
        type: Array,
        required: true
      },
      ogpId: {
        type: String,
        required: false
      }
    },
    computed: {
      displayCandidates() {
        return this.candidates.concat().splice(0, this.firstDisplayCandidates)
      },
      moreCandidates() {
        return this.candidates.concat().splice(this.firstDisplayCandidates, this.candidates.length - this.firstDisplayCandidates)
      }
    },
  }
</script>

<style scoped lang="scss">
  .el-col {
    margin-bottom: 45px;
  }

  .more-candidates {
    position: relative;
    overflow: hidden;
    height: 80px;

    &:before {
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
      content: "";
      width: 100%;
      height: 80px;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.9) 50%, #fff 100%);
    }

    &.all {
      height: auto;
      overflow: inherit;

      &:before {
        display: none;
      }

      .el-button {
        display: none;
      }
    }

    .el-button {
      z-index: 3;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      width: 168px;
      margin: auto;
    }
  }

  section.end {
    text-align: center;
    margin-bottom: 30px;
  }

  .share {
    margin: 45px auto;
  }

  .caution {
    margin-bottom: 60px;
    font-size: 12px;

    p {
      margin-bottom: 10px;
    }
  }

  .returnTop {
    font-weight: bold;
    font-size: 12px;
  }
</style>
