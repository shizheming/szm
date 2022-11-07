import { ListInterface, PageInterface } from '../../../interface/index';

export interface Api_order_params_part_interface {
  order_search_key: string;
  order_search_value: string;
  good_search_key: string;
  good_search_value: string;
  pay_status_arr: [];
  deliver_arr: [];
  shop_name: string;
  supplier_id: number;
  user_level: number;
  category_id: number;
  brand_name_arr: [];
  user_id: number;
  create_mode_arr: [];
  app_platform: string;
  sale_mode: number;
  delivery_mode: number;
  pay_type: number;
  payment_type: number;
  is_invoice: number;
  is_support_local: number;
  goods_source: number;
  distribute_order: number;
  owner_site_id: number;
  createTime: [];
  create_user_id: number;
  paymentTime: [];
  sub_status_arr: [];
  trade_no: number;
  deliveryTime: [];
  recommend_staff: string;
  marketing_type: number;
  order_type: number;
  is_return: number;
  package_no: string;
  is_mem_msg: number;
  sub_org_id: number;
  gas_account: string;
  business_id: number;
  is_pre_subscribe: number;
  source_site_id: number;
  spell_order_status: number;
  is_out_supplier: number;
  address: [];
}

export type Api_order_result_interface =
  ListInterface<Api_order_result_item_interface> & {
    total0: number;
    total5: number;
    total20: number;
    total30: number;
    total40: number;
    total50: number;
    total60: number;
    total110: number;
    totalAll: number;
    total: number;
    page: number;
    page_size: number;
  };

export type Api_order_params_interface =
  Partial<Api_order_params_part_interface> & PageInterface;

export interface Api_order_result_item_interface {
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
  sub_total_amount: number;
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
  is_support_local: number;
  shop_account_id: number;
  salesman_node_id: number;
  salesman_node_name: string;
  stock_node_name: string;
  stock_node_id: number;
  return_amount: number;
  is_pre_subscribe: number;
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
    price: number;
    real_price: number;
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

export interface Api_proxy_order_manage_edit_confirmsign_params_interface {
  user_id: string;
  osl_seq: string;
  operator: string;
}

export interface Api_proxy_order_manage_edit_confirmPreOrder_params_interface {
  osl_seq: string;
}

export interface Api_order_merchantRemark_batch_params_item_interface {
  merchant_remark: string;
  osl_seq: string;
  user_id: string;
}

export interface Api_order_orderSyncList_params_part_interface {
  sync_id: number;
  type: number;
  user_name: number;
  time: [];
}

export interface Api_order_orderSyncList_result_item_interface {
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

export type Api_order_orderSyncList_params_interface =
  Partial<Api_order_orderSyncList_params_part_interface> & PageInterface;

export interface orderCreateFormModelInterface {
  entryMode: string;
  sale_mode: string;
  out_ono: string;
  businessType: string;
  user_id: string;
  phone: string;
  wx_nickname: string;
  user_level_name: string;
  username: string;
  name: string;
  company_name: string;
  buyer_note: string;
  merchant_note: string;
  addressInfo: {
    name: string;
    mobile: string;
    addressIds: number[];
    address: string;
    tel: string;
    zipcode: string;
  };
  stockFreeze: string;
  delivery_mode: string;
  isInvoice: number;
  order_invoice: {
    invoice_form: number;
    invoice_kind: number;
    content_type: number;
    invoice_notice: string;
    invoice_title: string;
    vat_number: string;
    et_address: string;
    et_phone_num: string;
    et_bank_name: string;
    et_bank_account: string;
    invoice_username: string;
    invoice_phone_num: string;
    invoice_email: string;
    mArea: number[];
    invoice_address: string;
  };
  pay_mode: number;
}

export interface Api_proxy_user_User_UserSearch_epUserSearch_params_part_interface {
  user_id: string;
}

export type Api_proxy_user_User_UserSearch_epUserSearch_params_interface =
  Partial<Api_proxy_user_User_UserSearch_epUserSearch_params_part_interface> &
    PageInterface;

export interface Api_proxy_user_User_UserSearch_epUserSearch_result_item_interface {
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

export interface Api_goods_sku_list_fixed_params_part_interface {
  channel_id: number;
  is_listing: number;
  need_stock: number;
  business_id: number;
  is_support_local: number;
}
export interface Api_goods_sku_list_params_part_interface {
  goods_search_value: string;
  goods_search_key: string;
  category_id: number;
  brand_id: number;
  sku_qty_start: number;
  sku_qty_end: number;
}
export interface Api_goods_sku_list_params_interface
  extends Partial<Api_goods_sku_list_params_part_interface>,
    Api_goods_sku_list_fixed_params_part_interface,
    PageInterface {}
export interface Api_goods_sku_list_result_item_interface {}
