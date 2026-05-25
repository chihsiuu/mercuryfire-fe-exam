import axios from 'axios'
import type { AxiosInstance } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api-frontend-interview-server.metcfire.com.tw'

const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers.interviewerName = 'nia'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data as any
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // 觸發全局 401 事件，由 router 攔截器處理
      window.dispatchEvent(new Event('unauthorized'))
    }
    return Promise.reject(error)
  }
)

export default apiClient
