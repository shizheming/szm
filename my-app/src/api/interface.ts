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

// 订单搜索
export type OrderRequestParamsInterface = Partial<{
  osl_seq: string;
  user_id: string;
  shop_name: string;
  pay_status: string;
  orderTime: string;
  invoice_code: string;
  source_type: number;
}> &
  PageInterface;

// 订单单条出参
export interface OrderSingleInterface {
  ono: string;
  user_id: number;
  sub_list: OrderRowSingleInterface[];
}
// 订单行出参，把subList拿出来了，上面是主单号维度，下面是子单号维度
export interface OrderRowSingleInterface {
  ono: string;
  osl_seq: string;
  user_id: number;
  sub_status_name: string;
  pay_status_name: string;
  shop_name: string;
  sub_org_name: string;
  sub_purchase_amount: number;
  sub_total_pay: number;
  create_datetime: string;
  create_mode_name: string;
  allow_invoice_amount: number;
  rowSpan: number;
}

// 订单出参
export type orderRequestResultInterType = ListInterface<OrderSingleInterface>;

// 查看任务单条出参
export interface OrderSyncListSingleInterface {
  id: number;
  name: string;
  short_message: string;
  status: number;
  type: number;
  type_format: string;
  operator: string;
  status_format: string;
  operate_time: string;
  total_num: number;
  success_num: number;
  log_url: string;
  file_url: string;
  import_url: string;
}

// 查看任务出参
export type orderSyncListRequestResultInterType =
  ListInterface<OrderSyncListSingleInterface>;

// 查看任务入参
export type OrderSyncListRequestParamsInterface = Partial<{
  sync_id: number;
  type: number;
  user_name: number;
  time: [string, string];
  operate_time_begin: string;
  operate_time_end: string;
}> &
  PageInterface;

// 订单列表单条出参
export interface OrderListSingeInterface {
  activeKey: string;
  pay_mode: {
    value: number;
    name: string;
  };
  spell_order_status: number;
  receipt: number;
  sub_status_name: string;
  status: number;
  ono: string;
  approval_status: number;
  process_seq: string;
  approval_status_name: string;
  approval_time: number;
  osl_seq: string;
  id: number;
  enterprise_id: number;
  out_ono: string;
  user_id: number;
  user_id_string: string;
  user_level: string;
  tel: string;
  goods_source: number;
  goods_source_name: string;
  pay_mode_name: string;
  create_user_id: number;
  user_name: string;
  user_mobile: string;
  name: string;
  mobile: string;
  province_id: number;
  city_id: number;
  district_id: number;
  street_id: number;
  address: string;
  province_name: string;
  city_name: string;
  district_name: string;
  street_name: string;
  detailAddress: string;
  zipcode: string;
  gas_account: string;
  buy_company_name: string;
  apply_delivery_time: string;
  order_type: {
    value: number;
    name: string;
  };
  order_type_name: string;
  marketing_type: {
    value: string;
    name: string;
  };
  marketing_type_name: string;
  group_status: string;
  is_credit_order: number;
  create_time: string;
  create_datetime: string;
  order_time: string;
  order_datetime: string;
  confirm_time: string;
  pay_time: string;
  pay_datetime: string;
  pay_status: number;
  pre_delivery_time: string;
  delivery_time: string;
  delivery_datetime: string;
  recommend_staff: string;
  sub_status: {
    value: number;
    name: string;
  };
  sub_org_id: number;
  sub_org_enterprise_id: number;
  sub_org_name: string;
  distribute_org_id: number;
  distribute_org_enterprise_id: number;
  distribute_org_name: string;
  sale_mode: {
    value: number;
    name: string;
  };
  sale_mode_name: string;
  owner_site_id: number;
  shop_name: string;
  store_code: string;
  shop_id: number;
  business_id: number;
  business_name: string;
  supplier_id: number;
  supplier_name: string;
  delivery_mode: {
    value: number;
    name: string;
  };
  create_mode: {
    value: number;
    name: string;
  };
  create_mode_name: string;
  mem_msg: string;
  merchant_remark: string;
  is_invoice: number;
  is_invoice_print: number;
  is_return: number;
  is_returning: number;
  pay_type: {
    value: number;
    name: string;
  };
  pay_type_name: string;
  app_platform: string;
  trade_no: string;
  external_system_code: string;
  delivery_channel: number;
  is_delivery: number;
  sub_purchase_amount: number;
  sub_extra_fee: number;
  sub_total_amount: number | string;
  sub_total_pay: number;
  sub_total_freight: string;
  sub_total_price: number;
  sub_part_discount: number;
  sub_credit: string;
  sub_card_ticket_fee: string;
  sub_freight: number;
  sub_freight_use_credit: number;
  sub_use_gift_card_fee: number;
  sub_freight_card_ticket_fee: number;
  is_supplier_calculated: number;
  supplier_invoice_status: number;
  supplier_invoice_number: string;
  supplier_invoice_type: number;
  out_delivery_tag: number;
  distribute_order: number;
  distribute_order_name: string;
  is_support_local: number;
  is_support_local_name: string;
  shop_account_id: number;
  salesman_node_id: number;
  salesman_node_name: string;
  stock_node_name: string;
  stock_node_id: number;
  return_amount: number;
  is_pre_subscribe: number;
  is_pre_subscribe_name: string;
  service_no: string;
  sale_method: number;
  sale_type: number;
  sale_channel: number;
  stock_sale_delivery: number;
  sale_method_name: string;
  sale_type_name: string;
  sale_channel_name: string;
  stock_sale_delivery_name: string;
  is_allow_create_outstock: boolean;
  cost_price: number;
  shop_retail_price: number;
  allow_invoice_amount: number;
  item: {
    oi_seq: string;
    use_credit_amount: number;
    pic_url: string;
    pic_url_pic: string;
    goods_name: string;
    sale_unit: string;
    sku_id: number;
    cost_price: number;
    sku_code: string;
    shop_goods_code: string;
    shop_goods_id: number;
    sn: string;
    area_code: string;
    purchase_category_id: number;
    purchase_category_name: string;
    tms_material_code: string;
    snapshot: number;
    sku_spec: {
      spec_id: number;
      spec_name: string;
      spec_value: string;
      spec_group_id: number;
      spec_value_id: number;
      spec_group_name: string;
    }[];
    brand_name: string;
    category_id: string;
    category_name: string;
    first_category_name: string;
    second_category_name: string;
    third_category_name: string;
    price: number | string;
    real_price: number | string;
    purchase_amount: number;
    oi_use_gift_card_fee: number;
    freight: number;
    oiv_seq: string;
    oim_seq: string;
    qty: number;
    every_real_price: string;
    invoice_qty: number;
    invoice_item_amount: string;
    output_untax_total_amount: string;
    spbm: string;
    delivery_qty: number;
    buy_amount: number;
    item_extra_fee: number;
    item_part_discount_extra_fee: number;
    item_marketing_discount_extra_fee: number;
    output_tax_rate: number;
    output_tax_total_amount: string;
    input_tax_rate: number;
    shop_retail_price: number;
    sku_specs: string;
    goods_pics: string;
  }[];
  express: [];
  tms_customer: string;
  create_user_name: string;
  shop_account_name: string;
  user: {
    username: string;
    user_id: number;
    user_level: string;
    user_level_name: string;
  };
  consignee: {
    name: string;
    mobile: string;
    city_id: number;
    district_id: number;
    street_id: number;
    address: string;
    zipcode: string;
  };
  is_electron: number;
  business_user: number;
  owner_site_name: string;
  owner_org_name: string;
  verify_status: {
    value: number;
    name: string;
  };
  grouping: string;
  cancel_time: string;
  pay_deadline: string;
  group_time: string;
}

// 批量修改备注
export interface BatchRequestParamsInterface {
  ids: {
    merchant_remark: string;
    osl_seq: string;
    user_id: string;
  }[];
}

// 服务内容单条输出
export interface GetServerInfoSingleInterface {
  sku_code: string;
  goods_name: string;
  apply_server_time?: string;
  isTime: boolean;
  goods_list: {
    oi_seq: string;
    sku_code: string;
    goods_name: string;
    pic_url: string;
    sn: number;
    snapshot: number;
    sku_spec: {
      spec_id: number;
      spec_name: string;
      spec_value: string;
      spec_group_id: number;
      spec_value_id: number;
      spec_group_name: string;
    }[];
  }[];
}

// 配送安装选择时间列表单条输出
export interface QueryOrderPlansSingleInterface {
  org_code: string;
  orderPlans: {
    service_code: string;
    orderPlans: {
      planDate: string;
      planTime: number;
      planId: string;
    }[];
  }[];
}

// 预定购
export type confirmPreOrderRequestParamsType =
  | {
      osl_seq: string;
    }
  | {
      osl_seq: string;
      server_list: { apply_server_time: number | string }[];
    };
