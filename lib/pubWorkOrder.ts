import { supabase } from "@/lib/initSupabase";

export const getWorkOrderStatus = async () => {
  const { data, error } = await supabase.from('product_status_cn').select('*');
  if (error) {
    console.error(error);
  }
  return data;
}

export const getWorkOrderType = async () => {
  const { data, error } = await supabase.from('product_type_cn').select('*');
  if (error) {
    console.error(error);
  }
  return data;
}

export const getWorkBrand = async (keys: string) => {
  let key = keys
  const {data, error} = await supabase
  .from('product_type_cn')
  .select(`key, product_brand_cn(value, brand_id)`)
  .eq('key', key)

  try {
    if(data) return data
    console.error(error.message);
  } catch (error) {
    throw error
  }
}
