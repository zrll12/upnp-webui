import { reactive, onMounted } from 'vue'
import Cookies from 'js-cookie'
import { useMessage } from 'naive-ui'

export interface UserInfo {
  username: string
  available: boolean
}

export interface LoginForm {
  username: string
  password: string
}

export interface UseUserFrontendReturn {
  userInfo: UserInfo
  login: (loginForm: LoginForm) => Promise<void>
  logout: () => void
}

export function useUserFrontend(): UseUserFrontendReturn {
  const message = useMessage()
  
  // 用于存储用户信息的响应式变量
  const userInfo = reactive<UserInfo>({
    username: '',
    available: false
  })

  // 在组件挂载时检查cookie中是否有token和username
  onMounted(() => {
    const token = Cookies.get('token')
    const username = Cookies.get('username')
    
    if (token && username) {
      userInfo.username = username
      userInfo.available = true
    }
  })

  // 登录函数
  const login = async (loginForm: LoginForm): Promise<void> => {
    if (!loginForm.username || !loginForm.password) {
      message.error('请填写用户名和密码')
      return
    }

    try {
      const response: any = await $fetch('/api/user', {
        method: 'POST',
        body: loginForm,
      })
      
      // 保存token和username到cookie
      // 设置cookie过期时间为15天，与服务器端token验证时间一致
      const expiresIn = 15
      Cookies.set('token', response.token, { expires: expiresIn })
      Cookies.set('username', response.username || loginForm.username, { expires: expiresIn })
      
      // 更新用户信息
      userInfo.username = response.username || loginForm.username
      userInfo.available = true
      
      message.success('登录成功')
      return response
    } catch (error: any) {
      message.error(error.statusMessage || '登录失败')
      throw error
    }
  }

  // 登出函数
  const logout = () => {
    // 清除cookie
    Cookies.remove('token')
    Cookies.remove('username')
    
    // 重置用户信息
    userInfo.username = ''
    userInfo.available = false
    
    message.success('已登出')
  }

  return {
    userInfo,
    login,
    logout
  }
}