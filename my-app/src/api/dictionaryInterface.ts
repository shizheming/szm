import { ListInterface, PageInterface } from '../interface';
// 后台类目出参
export interface CategorySingleInterface {
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
  child?: CategorySingleInterface[];
}

// 供应商单条出参
export interface SupplierSingleInterface {
  id: number;
  name: string;
  code: string;
  status: number;
  stock_check_type: number;
  is_self: number;
  finance_code: string;
  identity_type: number;
}

// 商品品牌单条出参
export interface BrandSingleInterface {
  id: number;
  name: string;
}

// 通用字典单条出参
export interface DictSingleInterface {
  type: string;
  parent_code: string;
  code: string;
  value: string;
  remark: string;
  rank: number;
  enterprise_id: number;
}

// 通用字典出参
export type DictRequestResultInterface = {
  [key: string]: DictSingleInterface[];
};

// 销售单条站点
export interface SiteSingleInterface {
  id: number;
  name: string;
  org_id: number;
  is_virtual: number;
  status: number;
  remark: string;
  order_delay_day: number;
  delay_end_day: number;
  forbidden_date: string;
  create_time: string;
  enterprise_id: number;
  creator_id: number;
  status_name: string;
  org_name: string;
}

// 销售站点
export type SiteRequestResultInterface = ListInterface<SiteSingleInterface>;

// 订单销售组织单条出参
export interface OrgSingleInterface {
  id: number;
  org_code: string;
  name: string;
  parent_id: number;
  operations_type: number;
  business: string;
  status: number;
  remark: string;
  invoice_channel: string;
  invoice_type: string;
  is_support_invoice: number;
  invoice_company_code: string;
  self_delivery: number;
  create_time: string;
  enterprise_id: number;
  duty_sign: string;
  pay_type: string;
  share_profit: number;
  is_area_org: number;
  area_org_ids: string;
  is_support_purchase: number;
  area_org_text: string;
  operations_type_name: string;
  status_name: string;
}

// 订单销售组织出参
export type OrgRequestResultInterface = ListInterface<OrgSingleInterface>;

// 地址单条出参
export interface AddressSingleInterface {
  id: number;
  name: string;
  fullname: string;
  level: number;
  ad_code: number;
  real_name: string;
}

// 网点单条
export interface NodeSingleInterface {
  id: number;
  name: string;
  code: string;
  customer_store_code: number;
  type: number;
  org_id: number;
  org_name: string;
  node_city: string;
  province: number;
  city: number;
  district: number;
  detail_address: string;
  contact: string;
  contact_number: string;
  status: number;
  lat: string;
  lng: string;
  service_time: string;
  area: number;
  create_time: string;
  update_time: string;
  delete_time: string;
  has_stock_property: number;
  is_delete: number;
  enterprise_id: number;
  modify_time: string;
  city_name: string;
  province_name: string;
  district_name: string;
  is_wln: number;
  enable_stock_org: string;
}

// 网点出参
export type NodeRequestResultType = ListInterface<NodeSingleInterface>;
