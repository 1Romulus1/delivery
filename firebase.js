import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDq1fD-hmhH4jHY1zbncd4hjcDtmVyD-as',
  authDomain: 'voypost-c4457.firebaseapp.com',
  projectId: 'voypost-c4457',
  storageBucket: 'voypost-c4457.appspot.com',
  messagingSenderId: '886404629211',
  appId: '1:886404629211:web:a6bec909cc4be409f242fe',
  measurementId: 'G-WVSGZLL6LY',
}

export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
export const auth = getAuth()
