import { supabase } from './initSupabase'

export const getIsLoginSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    return false
  }
  return data.session
}


