<template>
  <div class="about">
    <h1>Parcel view</h1>
    <div class="row" v-for="order in orders" :key="order.id">
      <div class="col"> <Order :order="order" /></div>
      <div class="col"> Parcels</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import Order from '@/components/Order.vue'
  import { fetchOrders } from '@/services/orders'

  interface IOrder {
    id: string
    date: Date
    items: { id: string; quantity: number }[]
  }

  @Options({
    components: {
      Order,
    },
  })
  export default class HomeView extends Vue {
    private orders: IOrder[] = []

    public mounted(): void {
      fetchOrders().then(response => {
        const fetchedOrders = response.data
        const orders = []
        for (const key of Object.keys(fetchedOrders)) {
          const value = fetchedOrders[key]
          const mappedItems = (
            value as {
              id: string
              date: Date
              items: { item_id: string; quantity: number }[]
            }
          ).items.map(item => {
            return { id: item.item_id, quantity: item.quantity }
          })
          orders.push({
            id: key,
            date: value.date,
            items: mappedItems,
          })
        }

        this.orders = orders
      })
    }
  }
</script>

<style lang="scss">
  .row {
    width: 80vw;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;

    .col {
      width: 50%;
      padding: 0 10px;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }
</style>
