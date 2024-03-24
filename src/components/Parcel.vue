<template>
  <div class="parcel-details">
    <div class="top-info">
      <div class="info-item">Order ID: {{ parcel.orderId }}</div>
      <div class="info-item">Tracking ID: {{ parcel.trackingId }}</div>
      <div class="info-item">Palette: {{ parcel.paletteNumber }}</div>
      <div class="info-item">Weight: {{ parcel.weight / 1000 }}kg</div>
    </div>
    <div class="parcel-items">
      Items:
      <ul>
        <li v-for="item in parcel.items" :key="item.item_id">
          {{ item.item_id }} : {{ item.quantity }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import { IParcel } from '@/models/parcel'

  @Options({
    props: {
      parcel: Object,
    },
  })
  export default class Parcel extends Vue {
    public parcel!: IParcel
  }
</script>

<style scoped lang="scss">
  .parcel-details {
    font-size: 0.8em;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 8px 0;
    background-color: #f9f9f9;

    .top-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 8px;

      .info-item {
        margin: 4px 2px;
        flex: 1 1 180px;
        min-width: 0;
      }
    }

    .parcel-items {
      margin-top: 8px;
      font-size: 0.8em;

      ul {
        list-style-type: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        margin: 0;

        li {
          background-color: #fff;
          margin: 3px;
          padding: 4px 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          flex: 1 1 140px;
          text-align: center;

          &:hover {
            background-color: #eef;
          }
        }
      }
    }
  }
</style>
