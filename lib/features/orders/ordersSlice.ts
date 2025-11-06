import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Order {
  id: string
  userId: string
  items: any[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: string
}

interface OrdersState {
  items: Order[]
  isLoading: boolean
}

const initialState: OrdersState = {
  items: [],
  isLoading: false,
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload
      state.isLoading = false
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.items.unshift(action.payload)
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order["status"] }>) => {
      const order = state.items.find((order) => order.id === action.payload.id)
      if (order) {
        order.status = action.payload.status
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setOrders, addOrder, updateOrderStatus, setLoading } = ordersSlice.actions
export default ordersSlice.reducer
