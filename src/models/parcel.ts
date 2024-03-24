import { IItem } from './items'

export interface IParcel {
  items: IItem[]
  orderId: string
  paletteNumber: number
  trackingId: number
  weight: number
}
