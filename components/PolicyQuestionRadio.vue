<template>
  <div>
    <p>{{question.title}}</p>
    <p v-if="question.description">{{question.description}}</p>
    <el-radio-group v-model="internalValue">
      <el-radio
        v-for="(answer, i) in question.answers"
        :label="i"
        :key="i"
      >{{answer}}</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: "PolicyQuestionRadio",
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
        get () {
          return this.value
        },
        set (newVal) {
          if (this.value !== newVal) this.$emit('input', newVal)
        }
      }
    }
  }
</script>

<style scoped>
  div {
    padding: 10px;
  }

  .el-radio {
    display: block;
    margin-bottom: 10px;
  }

  .el-radio-group, .el-radio, .el-radio >>> .el-radio__input {
    line-height: inherit;
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
