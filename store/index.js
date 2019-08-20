import jsonDataQuestions from '~/assets/questions.json'
import jsonDataCandidate from '~/assets/votematch.json'

export const state = () => ({
  areas: [
    "青葉区",
    "泉区",
    "太白区",
    "宮城野区",
    "若林区",
    "わからない、区に関わらず調べたい"
  ],
  questions: jsonDataQuestions,
  candidates: jsonDataCandidate,
  collectionStatus: {
    all: 69,
    already: 56,
    yet: 12,
    denied: 1,
  }
})

export const getters = {
  areas: state => state.areas,
  questions: state => state.questions,
  candidates: state => state.candidates,
  collectionStatus: state => state.collectionStatus,
}
