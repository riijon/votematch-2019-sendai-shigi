<template>
  <div>
    <el-radio-group v-model="internalValue">
      <el-radio
        v-for="area in areas"
        :label="area"
        :key="area"
      >{{area}}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: "AreaQuestionRadio",
    props: {
      value: {
        type: String,
        default: null,
        required: false
      },
      areas: {
        type: Array,
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
  .el-radio {
    display: block;
    margin-bottom: 10px;
  }

  .el-radio-group, .el-radio, .el-radio >>> .el-radio__input {
    line-height: inherit;
  }
</style>
