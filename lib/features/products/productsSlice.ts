import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  sizes: string[]
  colors: string[]
  image: string
  description: string
}

interface ProductsState {
  items: Product[]
  isLoading: boolean
  filter: string
}

const initialState: ProductsState = {
  items: [],
  isLoading: false,
  filter: "all",
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
      state.isLoading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload
    },
  },
})

export const { setProducts, setLoading, setFilter } = productsSlice.actions
export default productsSlice.reducer
