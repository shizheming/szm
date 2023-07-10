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

// 用户列表单条出参
export interface UserSingleInterface {
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

// 用户列表出参
export type UserRequestResultInterface = ListInterface<UserSingleInterface>;

// 商品列表入参
export type SkuRequestParamsInterface = Partial<{
  goods_search_value: string;
  goods_search_key: string;
  category_id: number;
  brand_id: number;
  sku_qty_start: number;
  sku_qty_end: number;
  category_id_array: number[];
  channel_id: number;
  is_listing: number;
  need_stock: number;
  business_id: number;
  is_support_local: number;
  is_suit: number;
}> &
  PageInterface;

// 商品列表单条出参
export interface SkuSingleInterface {
  min_qty: number;
  adjust_mount: number;
  imgSrc: string;
  number: number;
  qty: number;
  sku_bar_code: string;
  sku_channel_relation_id: number;
  spu_name: string;
  shop_goods_id: number;
  is_suit: string | number;
  sku_specs: string;
  tms_material_code: string;
  suits: [];
  is_support_local: number;
  category_id: number;
  suggest_shop_price: number;
  sn: string;
  spu_id: number;
  current_selling_price: number;
  supplier_name: string;
  shop_goods_code: string;
  sku_type_name: string;
  member_price_name: string;
  purchase_category_id: number;
  shop_selling_price: number;
  type_id: number;
  area_code: string;
  brand_name: string;
  category_name: string;
  sku_id: number;
  shop_name: string;
  self_delivery: number;
  shop_org_id: number;
  brand_id: number;
  shop_id: number;
  express_delivery: number;
  org_id: number;
  category_path: string[];
  site_id: number;
  sku_specs_id: number;
  supplier_id: number;
  sku_code: string;
  business_id: number;
  pack_unit: string;
  is_support_oversold: number;
  input_tax_rate: string;
  sell_tax_rate: string;
  gallery: {
    id: number;
    goods_id: number;
    key: string;
    bucket: string;
    upload_channel: string;
  }[];
  ext_service: [];
  ext_service_list: [];
  member_price: {
    start_num: number;
    start_num_name: string;
    end_num: number;
    member_price: number;
  }[];
  real_qty: number;
  real_node_qty: number;
  stock_qty: number;
  account_discount_price: number;
}

// 商品列表出参
export type SkuRequestResultInterface = ListInterface<SkuSingleInterface>;

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

// 发票抬头单条出参
export interface InvoiceTitleSingleInterface {
  id: number;
  invoice_kind: number;
  invoice_title: string;
  vat_number: string;
  et_address: string;
  et_phone_num: string;
  et_bank_name: string;
  et_bank_account: string;
  invoice_username: string;
  invoice_phone_num: string;
  invoice_email: string;
  invoice_province_id: number;
  invoice_city_id: number;
  invoice_district_id: number;
  invoice_street_id: number;
  invoice_address: string;
  org_id: number;
  user_id: number;
  create_mode: number;
  rank: number;
  status: number;
  is_delete: number;
  enterprise_id: number;
  create_time: number;
  update_time: number;
  delete_time: number;
  modify_time: string;
  number: number;
  invoice_kind_name: string;
}

// 发票抬头出参
export type InvoiceTitleInterface = ListInterface<InvoiceTitleSingleInterface>;

// 发票抬头入参
export type InvoiceTitleParamsInterface = Partial<{
  invoice_kind: string;
  invoice_phone_num: string;
  vat_number: string;
}> &
  PageInterface;
