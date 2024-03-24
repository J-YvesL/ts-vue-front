interface IItem {
  item_id: string
  quantity: number
}

export interface IParcel {
  items: IItem[]
  orderId: string
  paletteNumber: number
  trackingId: number
  weight: number
}
