export interface PageInterface {
  page: number;
  page_size: number;
}

export interface ListInterface<T> {
  list: T[];
}

export interface Api_manager_me_result_interface {
  bucket: any;
  display_name: string;
  email: string;
  enterprise_id: number;
  id: string;
  is_mqj: string;
  is_platform: string;
  last_login_time: string;
  manager_id: number;
  org_code: string;
  org_data_pri: string;
  org_id: string;
  site_id: string;
  status: string;
  type: string;
  user_id: number;
  username: string;
}
