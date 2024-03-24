export interface IOrder {
  id: string
  date: Date
  items: { id: string; quantity: number }[]
}
