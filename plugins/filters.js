import Vue from 'vue'

Vue.filter('percent', function (value) {
  if (!value) return ''
  return Math.round(value * 100)
})
