<template>
  <div class="order-details">
    <div class="order-id">Order ID: {{ order.id }}</div>
    <div class="order-date">Date: {{ order.date }}</div>
    <ul class="item-list">
      <li
        v-for="item in preparedItems"
        :key="item.id"
        class="item"
        :style="{ backgroundColor: item.color }"
      >
        <div class="item-id">ID: {{ item.id }}</div>
        <div class="item-name">Name: {{ item.details.name }}</div>
        <div class="item-quantity">Quantity: {{ item.quantity }}</div>
        <div class="item-weight"
          >Weight: {{ item.details.weight / 1000 }}kg</div
        >
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
    public preparedItems: {
      id: string
      quantity: number
      color: string
      details: { name: string; weight: number }
    }[] = []

    public created(): void {
      this.preparedItems = this.order.items.map(item => ({
        ...item,
        color: this.getItemColor(item.id),
        details: this.getItemDetails(item.id),
      }))
    }

    getItemColor(itemId: string): string {
      return this.store.getters.getColorByItemId(itemId)
    }

    getItemDetails(itemId: string): { name: string; weight: number } {
      return this.store.getters.getItemById(itemId)
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
  }

  .item-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }

  .item-id {
    flex-basis: 100%;
    font-weight: bold;
  }

  .item-name,
  .item-quantity,
  .item-weight {
    flex: 1;
  }

  .item:hover {
    background-color: #f0f0f0;
  }
</style>
