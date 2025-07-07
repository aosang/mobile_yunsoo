import { getPublicTime, showToast } from "@/lib/commonFunction";
import { WorkOrderProps } from "@/lib/dbtype";
import { supabase } from "@/lib/initSupabase";

// 获取工单数据
export const getWorkOrderData = async (id?: string, cId?: string) => {
  if (cId) {
    const { data, error } = await supabase
      .from('work_order_cn')
      .select('*')
      .order('created_time', { ascending: false })
      .match({ created_id: cId })
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  else {
    const { data, error } = await supabase
      .from('work_order_cn')
      .select('*')
      .order('created_time', { ascending: false })
      .match({ id: id })
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
}


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

export const getInsertWorkOrder = async ({
    created_update,
    created_time,
    created_product,
    created_name,
    created_solved,
    created_type,
    created_brand,
    created_status,
    created_remark,
    created_text
}: WorkOrderProps) => {
  const { error } = await supabase.from('work_order_cn').insert({
    created_id: getPublicTime()[1],
    created_update,
    created_time,
    created_product,
    created_name,
    created_solved,
    created_type,
    created_brand,
    created_status,
    created_remark,
    created_text
  })
  if (error) {
    showToast(error.message, 'error')
  }else {
    showToast('添加成功', 'success')
  }
}

// 删除工单
export const getDeleteWorkOrder = async (delId: string) => {
  const { error } = await supabase.from('work_order_cn').delete().eq('created_id', delId)
  if (error) {
    showToast(error.message, 'error')
  }else {
    showToast('删除成功', 'success')
  }
}