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

export const getWorkOrderData = async () => {
  try {
    const { data, error } = await supabase
      .from('work_order_cn')
      .select('*')
      .order('created_time', { ascending: false })
    
    if (error) {
      if (error.message === 'JWT expired') {
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
            return null
          }
          return retryData
        }
      }
      console.error('获取数据失败:', error)
      return null
    }
    return data
  } catch (err) {
    console.error('请求异常:', err)
    return null
  }
}

