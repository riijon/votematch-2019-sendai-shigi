<template>
  <div class="policy-question">
    <div class="title">
      <h4>{{question.title}}</h4>
      <el-collapse
        v-model="activeNames"
        v-if="question.description"
      >
        <el-collapse-item title="補足説明を読む" name="1">
          <div>{{question.description}}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-radio-group v-model="internalValue">
      <el-radio
        v-for="(answer, i) in question.answers"
        :label="i"
        :key="i"
      >{{answer}}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: "PolicyQuestionRadio",
    data() {
      return {
        activeNames: []
      }
    },
    props: {
      value: {
        type: Number,
        default: null,
        required: false
      },
      question: {
        type: Object,
        required: true
      }
    },
    computed: {
      internalValue: {
        get() {
          return this.value
        },
        set(newVal) {
          if (this.value !== newVal) this.$emit('input', newVal)
        }
      }
    }
  }
</script>

<style scoped>
  .title {
    margin-bottom: 16px;
  }

  .title h4 {
    font-size: 16px;
  }

  .el-radio {
    display: block;
    margin-bottom: 10px;
  }

  .el-radio-group, .el-radio, .el-radio >>> .el-radio__input {
    line-height: inherit;
  }

  .el-collapse {
    border-top: inherit;
    margin: 5px 0;
  }
</style>

<style>
  .el-radio, .el-radio__input {
    white-space: normal;
  }

  .el-radio__input {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .el-radio__label {
    display: inline-block;
    padding-left: 25px;
  }
</style>
