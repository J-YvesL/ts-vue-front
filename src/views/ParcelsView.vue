<template>
  <div class="about">
    <h1>Parcel view</h1>
    <Order v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import Order from '@/components/Order.vue'

  @Options({
    components: {
      Order,
    },
  })
  export default class HomeView extends Vue {
    private orders = [
      {
        id: 'someID',
        date: new Date(),
        items: [{ id: 'itemID', quantity: 4 }],
      },
    ]
  }
</script>
