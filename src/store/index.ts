import { createStore } from 'vuex'
import { getRandomColor } from '@/helpers/getRandomColor'
import { IItem } from '@/models/items'
import { fetchItems } from '@/services/items'

export default createStore({
  state: {
    itemColors: {} as Record<string, string>,
    items: {} as Record<string, IItem>,
  },
  getters: {
    getColorByItemId:
      state =>
      (itemId: string): string | undefined => {
        return state.itemColors[itemId]
      },
    getItemById: state => (id: string) => {
      return state.items[id]
    },
  },
  mutations: {
    setItemColor(state, { itemId, color }) {
      state.itemColors[itemId] = color
    },
    setItems(state, items: Record<string, IItem>) {
      state.items = items
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
            commit('setItemColor', { itemId: item.item_id, color })
          }
        })
      })
    },
    async loadItems({ commit }) {
      try {
        fetchItems().then(response => {
          commit('setItems', response.data)
        })
      } catch (error) {
        console.error('There was an error fetching the items:', error)
      }
    },
  },
  modules: {},
})
