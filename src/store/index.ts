import { createStore } from 'vuex'
import { getRandomColor } from '@/helpers/getRandomColor'

export default createStore({
  state: { itemColors: {} as Record<string, string> },
  getters: {
    getColorByItemId:
      state =>
      (itemId: string): string | undefined => {
        return state.itemColors[itemId]
      },
  },
  mutations: {
    SET_ITEM_COLOR(state, { itemId, color }) {
      state.itemColors[itemId] = color
    },
  },
  actions: {
    colorPanelLoad({ commit, state }, fetchedOrders) {
      Object.values(
        fetchedOrders as Record<
          string,
          { date: Date; items: { item_id: string; quantity: number }[] }
        >
      ).forEach(order => {
        order.items.forEach(item => {
          if (!(item.item_id in state.itemColors)) {
            const color = getRandomColor()
            commit('SET_ITEM_COLOR', { itemId: item.item_id, color })
          }
        })
      })
    },
  },
  modules: {},
})
