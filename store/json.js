import jsonData from '~/assets/votematch-20190826.json'

export const state = () => ({
  data: jsonData,
})

export const getters = {
  getAll: state => state.data,
}
