<template>
  <div class="parcel-profit">
    Number of Parcels: {{ parcels.length }}. Profit :
    {{ computeParcelProfit() }}€
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import { IParcel } from '@/models/parcel'

  @Options({
    props: {
      parcels: Array as () => IParcel[],
    },
  })
  export default class ParcelProfit extends Vue {
    public parcels!: IParcel[]

    public computeParcelProfit(): number {
      let totalProfit = 0

      this.parcels.forEach(parcel => {
        const weightInKg = parcel.weight / 1000

        if (weightInKg <= 1) {
          totalProfit += 1
        } else if (weightInKg > 1 && weightInKg <= 5) {
          totalProfit += 2
        } else if (weightInKg > 5 && weightInKg <= 10) {
          totalProfit += 3
        } else if (weightInKg > 10 && weightInKg <= 20) {
          totalProfit += 5
        } else if (weightInKg > 20) {
          totalProfit += 10
        }
      })

      return totalProfit
    }
  }
</script>

<style scoped lang="scss">
  .parcel-profit {
    font-weight: bold;
    font-size: 0.9em;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 8px 0;
    background-color: #f9f9f9;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
