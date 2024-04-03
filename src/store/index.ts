import { createStore } from 'vuex'
import { getRandomColor } from '@/helpers/getRandomColor'

export default createStore({
  state: {
    helloMessageColor: { rgbValue: '#000000' } as { rgbValue: string },
  },
  getters: {
    getHelloMessageColor: state => (): string => {
      return state.helloMessageColor.rgbValue
    },
  },
  mutations: {
    setHelloMessageColor(state, color) {
      state.helloMessageColor.rgbValue = color
    },
  },
  actions: {
    randomizeHelloMessage({ commit }) {
      commit('setHelloMessageColor', getRandomColor())
    },
  },
  modules: {},
})
