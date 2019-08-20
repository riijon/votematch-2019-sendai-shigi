<template>
  <div class="result-candidate-card">
    <el-row>
      <el-col :span="8" :md="24" class="image">
        <span>{{ranking}}</span>
        <el-image
          :src="'/votematch/sen2019/images/candidates/' + candidate.image"
        ></el-image>
      </el-col>
      <el-col :span="16" :md="24">
        <ul>
          <li class="party"><span :style="{backgroundColor: partyColor}">{{candidate.party}}</span></li>
          <li class="hurigana">{{candidate.hurigana}}</li>
          <li class="name">{{candidate.name}}</li>
          <li class="description">会派：{{candidate.group}} | {{candidate.description}}</li>
        </ul>
      </el-col>
    </el-row>
    <div class="rate">
      <span>マッチ度</span>
      <el-progress :stroke-width="20" :percentage="ratePercentage(candidate.rate)"></el-progress>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ResultCandidateCard",
    props: {
      candidate: {
        type: Object,
        required: true
      },
      ranking: {
        type: Number,
        required: true
      }
    },
    methods: {
      ratePercentage(value) {
        return Math.round(value * 100);
      }
    },
    computed: {
      partyColor() {
        switch (this.candidate.party) {
          case '自由民主党':
            return '#3CA324'
            break
          case '立憲民主党':
            return '#004097'
            break
          case '国民民主党':
            return '#FABD00'
            break
          case '日本共産党':
            return '#DB001B'
            break
          case '公明党':
            return '#F55881'
            break
          case '社会民主党':
            return '#1467aa'
            break
          case '無所属':
            return '#7C7C7C'
            break
          default:
            return '#7C7C7C'
            break
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .image {
    position: relative;

    span {
      position: absolute;
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
      background-color: $warning;
      font-size: 13px;
      line-height: 20px;
      color: #ffffff;
      text-align: center;
      z-index: 3;
    }

    img {
      width: 100%;
      vertical-align: middle;
    }
  }

  ul {
    @include mq() {
      padding-left: 12px;
    }

    li {
      color: #606266;
      font-size: 14px;
      margin-bottom: 3px;

      &.hurigana {
        font-size: 12px;
        margin-bottom: 0;
      }

      &.name {
        font-size: 18px;
        color: #303133;
      }

      span {
        color: #ffffff;
        font-size: 12px;
        padding: 1px 5px;;
        display: inline-block;
      }
    }
  }

  .rate {
    position: relative;
    margin: 15px 0 0;

    span {
      position: absolute;
      right: 0;
      top: -15px;
      font-size: 14px;
      color: #606266;
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
      line-height: 1;
    }
  }
</style>

<style scoped>
  .el-progress >>> .el-progress__text {
    font-size: 28px !important;
  }

  .el-progress >>> .el-progress-bar {
    padding-right: 70px;
    margin-right: -68px;
  }

  .el-row {
    display: flex;
    flex-wrap: wrap;
  }
</style>
