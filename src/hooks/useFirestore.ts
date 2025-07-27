/**
 * Custom hook for Firestore database operations
 * Handles all CRUD operations for the application
 */
import { useState, useEffect } from 'react'
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy,
  where 
} from 'firebase/firestore'
import { db } from '../config/firebase'

export interface FirestoreHook<T> {
  data: T[]
  loading: boolean
  error: string | null
  add: (item: Omit<T, 'id'>) => Promise<void>
  update: (id: string, item: Partial<T>) => Promise<void>
  remove: (id: string) => Promise<void>
  refresh: () => void
}

/**
 * Generic Firestore hook for any collection
 */
export function useFirestore<T extends { id: string }>(
  collectionName: string,
  orderByField?: string
): FirestoreHook<T> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = () => {
    setLoading(true)
    setError(null)
  }

  useEffect(() => {
    const collectionRef = collection(db, collectionName)
    const q = orderByField 
      ? query(collectionRef, orderBy(orderByField))
      : collectionRef

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[]
        setData(items)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
        console.error('Firestore error:', err)
      }
    )

    return unsubscribe
  }, [collectionName, orderByField])

  const add = async (item: Omit<T, 'id'>) => {
    try {
      await addDoc(collection(db, collectionName), {
        ...item,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    } catch (err: any) {
      setError(err.message)
    }
  }

  const update = async (id: string, item: Partial<T>) => {
    try {
      await updateDoc(doc(db, collectionName, id), {
        ...item,
        updatedAt: new Date()
      })
    } catch (err: any) {
      setError(err.message)
    }
  }

  const remove = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id))
    } catch (err: any) {
      setError(err.message)
    }
  }

  return { data, loading, error, add, update, remove, refresh }
}