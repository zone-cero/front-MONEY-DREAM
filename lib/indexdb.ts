const DB_NAME = 'MoneyDreamDB'
const DB_VERSION = 1
const STORE_NAME = 'auth'

export interface UserData {
  id: string
  email: string
  name: string
  role: 'admin' | 'client'
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
}

// Initialize IndexedDB
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('IndexedDB is not available in server-side'))
      return
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
  })
}

// Save user to IndexedDB
export const saveUserToDB = async (user: UserData): Promise<void> => {
  try {
    const db = await initDB()
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    
    // Always use 'currentUser' as the key
    await store.put({ ...user, id: 'currentUser' })
    
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log('[v0] User saved to IndexedDB:', user.email)
        resolve()
      }
      transaction.onerror = () => reject(transaction.error)
    })
  } catch (error) {
    console.error('[v0] Error saving user to IndexedDB:', error)
    throw error
  }
}

// Get user from IndexedDB
export const getUserFromDB = async (): Promise<UserData | null> => {
  try {
    const db = await initDB()
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get('currentUser')

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const user = request.result
        if (user) {
          console.log('[v0] User loaded from IndexedDB:', user.email)
          resolve(user)
        } else {
          console.log('[v0] No user found in IndexedDB')
          resolve(null)
        }
      }
      request.onerror = () => reject(request.error)
    })
  } catch (error) {
    console.error('[v0] Error getting user from IndexedDB:', error)
    return null
  }
}

// Remove user from IndexedDB
export const removeUserFromDB = async (): Promise<void> => {
  try {
    const db = await initDB()
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    await store.delete('currentUser')

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log('[v0] User removed from IndexedDB')
        resolve()
      }
      transaction.onerror = () => reject(transaction.error)
    })
  } catch (error) {
    console.error('[v0] Error removing user from IndexedDB:', error)
    throw error
  }
}

// Update user info in IndexedDB (for profile updates)
export const updateUserInDB = async (updates: Partial<UserData>): Promise<void> => {
  try {
    const currentUser = await getUserFromDB()
    if (!currentUser) {
      throw new Error('No user found to update')
    }

    const updatedUser = { ...currentUser, ...updates, id: 'currentUser' }
    await saveUserToDB(updatedUser)
  } catch (error) {
    console.error('[v0] Error updating user in IndexedDB:', error)
    throw error
  }
}
