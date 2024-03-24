<template>
  <div class="order-details">
    <div class="order-id">Order ID: {{ order.id }}</div>
    <div class="order-date">Date: {{ order.date }}</div>
    <ul class="order-items">
      <li
        v-for="item in order.items"
        :key="item.id"
        :style="{ backgroundColor: getItemColor(item.id) }"
      >
        {{ item.id }} : {{ item.quantity }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import { useStore } from 'vuex'

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
    private store = useStore()
    public order!: {
      id: string
      date: Date
      items: { id: string; quantity: number }[]
    }

    getItemColor(itemId: string): string {
      return this.store.getters.getColorByItemId(itemId)
    }
  }
</script>

<style scoped lang="scss">
  .order-details {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 10px 0;
    background-color: #f9f9f9;

    .order-id,
    .order-date {
      font-weight: bold;
      margin-bottom: 10px;
    }

    .order-items {
      list-style-type: none;
      padding: 0;

      li {
        background-color: #fff;
        margin: 5px 0;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;

        &:hover {
          background-color: #eef;
        }
      }
    }
  }
</style>
