import { SelectProps } from 'ant-design-vue';
import {
  ListInterface,
  PageInterface,
  partPartial,
} from '../../../interface/index';
import { SkuRequestResultInterface } from '../../../api/interface';

export interface OrderListRequestParamsInterface {
  order_search_key: string;
  order_search_value: string;
  good_search_key: string;
  good_search_value: string;
  pay_status_arr: number[];
  deliver_arr: number[];
  shop_name: string;
  supplier_id: number;
  user_level: number;
  category_id: number;
  category_id_array: number[];
  brand_name_arr: number[];
  user_id: number;
  create_mode_arr: number[];
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
  createTime: [string, string];
  create_time_start: string;
  create_time_end: string;
  create_user_id: number;
  paymentTime: [string, string];
  pay_time_start: string;
  pay_time_end: string;
  pre_delivery_start_date: string;
  pre_delivery_end_date: string;
  sub_status_arr: string[];
  trade_no: number;
  deliveryTime: [string, string];
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
  address: number[];
  pay_mode: number;
}

export type OrderListRequestResultInterface =
  ListInterface<OrderListRequestResultItemInterface> & {
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

export type OrderLsitParamsPageInterface =
  Partial<OrderListRequestParamsInterface> & PageInterface;

export interface OrderListRequestResultItemInterface {
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

export interface ConfirmsignRequestParamsInterface {
  user_id: string;
  osl_seq: string;
  operator: string;
}

export interface BatchRequestParamsInterface {
  merchant_remark: string;
  osl_seq: string;
  user_id: string;
}

export interface OrderSyncListRequestParamsInterface {
  sync_id: number;
  type: number;
  user_name: number;
  time: [string, string];
  operate_time_begin: string;
  operate_time_end: string;
}

export interface OrderSyncListRequestResultItemInterface {
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

export type OrderSyncListRequestParamsPageInterface =
  Partial<OrderSyncListRequestParamsInterface> & PageInterface;

export type AddParamsInterface = Partial<{
  qty: number;
  total_price: number;
  freight: number;
  entryMode: string;
  sale_mode: string;
  buyer_note: string;
  api_type: number;
  out_ono: string;
  businessType: string;
  pay_mode_name: string;
  phone: string;
  wx_nickname: string;
  user_level_name: string;
  username: string;
  name: string;
  company_name: string;
  stockFreeze: string;
  delivery_mode: number;
  isInvoice: number;
  pay_mode: number;
  user_id: string;
  site_id: number;
  merchant_note: string;
  note: string;
  delivery_mode_list: [];
  buyer_shop_goods_list: {
    qty: number;
    shop_goods_id: number;
    adjust_mount: number;
  }[];
}> & {
  tableDataSourceArray: SkuRequestResultInterface[];
  order_invoice: Partial<{
    invoice_form: number;
    invoice_kind: number;
    content_type: number;
    invoice_notice: string;
    invoice_type: number;
    invoice_title: string;
    vat_number: string;
    et_address: string;
    et_phone_num: string;
    et_bank_name: string;
    et_bank_account: string;
    invoice_username: string;
    invoice_phone_num: string;
    invoice_email: string;
    province_id: number;
    province_name: string;
    city_id: number;
    city_name: string;
    district_id: number;
    district_name: string;
    street_id: number;
    street_name: string;
    invoice_address: string;
    apply_scene: number;
  }> & {
    mArea: number[];
  };
  shop_goods_list: {
    qty: number;
    shop_goods_id: number;
    adjust_mount: number;
  }[];
  validator: { total_pay?: number };
  addressInfo: Partial<{
    name: string;
    mobile: string;
    tel: string;
    email: string;
    province_id: number;
    province_name: string;
    city_id: number;
    city_name: string;
    district_id: number;
    district_name: string;
    street_id: number;
    street_name: string;
    real_name: string;
    zipcode: string;
    address: string;
  }> & { addressIds: number[] };
};

export interface QueryOrderPlansByOslSeqRequestResultItemInterface {
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

export interface GetServerInfoRequestResultItemInterface {
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

export interface Api_proxy_order_Manage_Invoice_repairInvoice_params_interface {
  invoice_type: number;
  invoice_kind: number;
  invoiceContent: number;
  et_address: string;
  et_phone_num: string;
  et_bank_name: string;
  et_bank_account: string;
  invoice_username: string;
  invoice_phone_num: string;
  invoice_email: string;
  invoice_address: string;
  invoice_title: string;
  vat_number: string;
  mArea: number[];
}
