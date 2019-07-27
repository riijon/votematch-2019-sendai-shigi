<template>
  <div>
    <el-checkbox-group v-model="internalValue" :max="3">
      <el-checkbox
        v-for="(policy, index) in primaryPolicies"
        :label="policy"
        :key="policy"
      ></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: "primaryQuestionCheckbox",
    props: {
      value: {
        type: Array,
        default: null,
        required: false
      },
      primaryPolicies: {
        type: Array,
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
  .el-checkbox {
    display: block;
    margin-bottom: 8px;
  }
</style>
