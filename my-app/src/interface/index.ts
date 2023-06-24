// 分页
export interface PageInterface {
  page: number;
  page_size: number;
}

// 列表出参
export interface ListInterface<T> {
  list: T[];
}

// 部分可选参数入参
export type partPartial<T, AK extends keyof T> = {
  [K in keyof Omit<T, AK>]?: T[K];
} & { [K in AK]: Partial<T[K]> };

// 登陆接口出参
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

export interface PermissionsRequestResultInterface {
  children: PermissionsRequestResultInterface[];
  display_name: string;
  id: number;
  name: string;
  parent_id: number;
  sort: number;
  url: string;
  permission_group?: {
    create_time: string;
    delete_time: number;
    display_name: string;
    enterprise_id: number;
    guard_name: string;
    id: number;
    is_delete: number;
    modules_id: number;
    name: string;
    permission_name: string;
    sort: number;
    update_time: string;
    url: string;
  }[];
}
