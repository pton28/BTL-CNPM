import axios from '@/services/axios.customize'
import { jwtDecode } from 'jwt-decode' // npm install jwt-decode

export const setTokens = tokens => {
   console.log('settoken method', tokens.access_token)
   localStorage.setItem('token', tokens.access_token)
}

export const getTokens = () => {
   const token = localStorage.getItem('token')
   return token // Trả về string hoặc null
}

export const removeTokens = () => {
   localStorage.removeItem('token')
}

export const isAuthenticated = () => {
   const token = getTokens()
   return !!token // ✅ Kiểm tra có token không
}

export const getCurrentUser = () => {
   const token = getTokens()
   if (!token) return null

   try {
      const decoded = jwtDecode(token)
      return decoded
   } catch (error) {
      console.error('Invalid token:', error)
      return null
   }
}
