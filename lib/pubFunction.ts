import { WorkOrderProps } from './dbtype'
import { supabase } from './initSupabase'

export const getIsLoginSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    if (error.message === 'JWT expired') {
      // 尝试刷新会话
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession()
      if (!refreshError && refreshData.session) {
        return refreshData.session
      }
    }
    return false
  }
  return data.session
}

export const getUserInfo = async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    throw new Error(error.message)
  }
  return data.user
}

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    throw new Error(error.message)
  }
  return data.session
}

export const getProfiles = async (id: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .match({ id: id })
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const getWorkOrderData = async (id?: string, retryCount = 3): Promise<WorkOrderProps[] | null> => {
  try {
    // 检查会话状态
    const session = await getIsLoginSession()
    if (!session) {
      throw new Error('登录已过期，请重新登录')
    }
    const { data, error } = await supabase
      .from('work_order_cn')
      .select('*')
      .order('created_time', { ascending: false })
      .match({ id: id  })
    if (error) {
      if (error.message === 'JWTpired') {
        // 如果token过期，先尝试刷新会话
        const { data: session } = await supabase.auth.refreshSession()
        if (session) {
          // 重新尝试获取数据
          const { data: retryData, error: retryError } = await supabase
            .from('work_order_cn')
            .select('*')
            .order('created_time', { ascending: false })
          
          if (retryError) {
            console.error('重试获取数据失败:', retryError)
            if (retryCount > 0) {
              // 递归重试，减少重试次数
              return await getWorkOrderData(id, retryCount - 1)
            }
            throw new Error('获取数据失败，请稍后重试')
          }
          return retryData
        }
      }
      
      // 处理其他类型的错误
      if (error.code === 'PGRST301') {
        throw new Error('数据库连接失败，请稍后重试')
      } else if (error.code === '42501') {
        throw new Error('没有权限访问该数据')
      } else {
        throw new Error(error.message || '获取数据失败，请稍后重试')
      }
    }
    
    return data
  } catch (err) {
    console.error('请求异常:', err)
    if (retryCount > 0) {
      // 等待1秒后重试
      await new Promise(resolve => setTimeout(resolve, 1000))
      return await getWorkOrderData(id, retryCount - 1)
    }
    throw err
  }
}

