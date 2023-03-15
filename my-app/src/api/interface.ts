export interface CategoryInterface {
  id: number;
  pid: number;
  name: string;
  level: number;
  commission_rate: string;
  category_path: string;
  sort: number;
  create_time: string;
  update_time: string;
  delete_time: string;
  is_delete: number;
  modify_time: string;
  enterprise_id: number;
  source_db: string;
  source_id: string;
  get_category_relation: any[];
  child?: CategoryInterface[];
}

export interface UserInterface {
  user_id: string;
  third_user_id: string;
  username: string;
  name: string;
  wx_nickname: string;
  phone: string;
  exp_value: number;
  company_name: string;
  is_employee: number;
  user_level_name: string;
}
