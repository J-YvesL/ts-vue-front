<template>
  <div class="about">
    <h1>Parcel view</h1>
    <div class="row" v-for="order in orders" :key="order.id">
      <div class="col"> <Order :order="order" /></div>
      <div class="col">
        <ParcelProfit :parcels="parcels.filter(p => p.orderId === order.id)" />
        <Parcel
          v-for="parcel in parcels.filter(p => p.orderId === order.id)"
          :key="parcel.trackingId"
          :parcel="parcel"
      /></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import { IOrder } from '@/models/order'
  import { IParcel } from '@/models/parcel'
  import Order from '@/components/Order.vue'
  import ParcelProfit from '@/components/ParcelProfit.vue'
  import Parcel from '@/components/Parcel.vue'
  import { fetchOrders } from '@/services/orders'
  import { fetchParcels } from '@/services/parcels'

  @Options({
    components: {
      Order,
      ParcelProfit,
      Parcel,
    },
  })
  export default class HomeView extends Vue {
    private orders: IOrder[] = []
    private parcels: IParcel[] = []

    public mounted(): void {
      // FETCH ORDERS
      fetchOrders().then(response => {
        const fetchedOrders = response.data
        this.mapAndSaveOrders(fetchedOrders)
      })

      // FETCH PARCELS
      fetchParcels().then(response => {
        const fetchedParcels = response.data
        this.parcels = fetchedParcels
      })
    }

    private mapAndSaveOrders(
      fetchedOrders: Record<
        string,
        { date: Date; items: { item_id: string; quantity: number }[] }
      >
    ): void {
      const orders = []
      for (const key of Object.keys(fetchedOrders)) {
        const value = fetchedOrders[key]
        const mappedItems = value.items.map(item => {
          return { id: item.item_id, quantity: item.quantity }
        })
        orders.push({
          id: key,
          date: value.date,
          items: mappedItems,
        })
      }

      this.orders = orders
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
