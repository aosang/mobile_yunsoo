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

export const getDeviceList = async () => {
  const { data, error } = await supabase.from('it_assets_cn').select('*');
  if (error) {
    console.error(error);
  }
  return data;
}

