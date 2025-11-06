import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import cartReducer from "./features/cart/cartSlice"
import productsReducer from "./features/products/productsSlice"
import ordersReducer from "./features/orders/ordersSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      products: productsReducer,
      orders: ordersReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
