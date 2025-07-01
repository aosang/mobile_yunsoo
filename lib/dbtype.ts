export type LoginForm = {
  email: string
  password: string
  company_name: string
  user_name: string
}

export type WorkOrderProps = {
  created_update: string,
  created_id: string,
  created_time: string,
  created_product: string,
  created_name: string,
  created_solved: string,
  created_type: string,
  created_brand: string,
  created_status: string,
  created_remark: string,
  created_text: string
}

export type UserInfoProps = {
  id: string,
  username: string,
  company: string,
  email: string,
  time: string
}