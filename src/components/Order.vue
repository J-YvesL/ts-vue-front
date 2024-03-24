<template>
  <div>
    <h1>{{ order.id }}</h1>
    <div>{{ order.date }}</div>
    <ul>
      <li v-for="item in order.items" :key="item.id">
        {{ item.id }} : {{ item.quantity }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'

  @Options({
    props: {
      order: {
        id: String,
        date: Date,
        items: Array,
      },
    },
  })
  export default class Order extends Vue {
    public order!: {
      id: string
      date: Date
      items: { id: string; quantity: number }[]
    }
  }
</script>

<style scoped lang="scss"></style>
