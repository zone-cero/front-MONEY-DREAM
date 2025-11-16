import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { saveUserToDB, removeUserFromDB } from "@/lib/indexdb"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "client"
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
}

export type UserState = User

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true to check IndexedDB
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
      if (typeof window !== 'undefined') {
        saveUserToDB(action.payload).catch(console.error)
      }
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.isLoading = false
      if (typeof window !== 'undefined') {
        removeUserFromDB().catch(console.error)
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        // Update IndexedDB
        if (typeof window !== 'undefined') {
          saveUserToDB(state.user).catch(console.error)
        }
      }
    },
  },
})

export const { setUser, logout, setLoading, updateUserProfile } = authSlice.actions
export default authSlice.reducer
