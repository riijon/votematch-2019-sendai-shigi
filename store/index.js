import jsonDataQuestions from '~/assets/questions.json'
import jsonDataCandidate from '~/assets/votematch.json'

export const state = () => ({
  questions: jsonDataQuestions,
  candidates: jsonDataCandidate,
})

export const getters = {
  questions: state => state.questions,
  candidates: state => state.candidates,
}
