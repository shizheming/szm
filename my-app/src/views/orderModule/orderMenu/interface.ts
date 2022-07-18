import { PageInterface } from "../../../interface/index";

export interface orderFormModelInterface {
  order_search_key?: string;
  order_search_value?: string;
  good_search_key?: string;
  good_search_value?: string;
  pay_status_arr?: [];
  deliver_arr?: [];
  shop_name?: string;
  supplier_id?: number;
  user_level?: number;
  category_id?: number;
  brand_name_arr?: [];
  user_id?: number;
  create_mode_arr?: [];
  app_platform?: string;
  sale_mode?: number;
  delivery_mode?: number;
  pay_type?: number;
  payment_type?: number;
  is_invoice?: number;
  is_support_local?: number;
  goods_source?: number;
  distribute_order?: number;
  owner_site_id?: number;
  createTime?: [];
  create_user_id?: number;
  paymentTime?: [];
  sub_status_arr?: [];
  trade_no?: number;
  deliveryTime?: [];
  recommend_staff?: string;
  marketing_type?: number;
  order_type?: number;
  is_return?: number;
  package_no?: string;
  is_mem_msg?: number;
  sub_org_id?: number;
  gas_account?: string;
  business_id?: number;
  is_pre_subscribe?: number;
  source_site_id?: number;
  spell_order_status?: number;
  is_out_supplier?: number;
  address?: [];
}

export interface OrderResultInterface {
  list: orderFormModelInterface[];
}

export interface OrderParamsInterface
  extends orderFormModelInterface,
    PageInterface {}

export interface ConfirmsignParamsInterface {
  user_id: string;
  osl_seq: string;
  operator: string;
}

export interface ConfirmPreOrderParamsInterface {
  osl_seq: string;
}

export interface RemarkFormModelInterface {
  merchant_remark: string;
}

export interface BatchParamsInterface {
  ids: {
    merchant_remark: string;
    osl_seq: string;
    user_id: string;
  }[];
}

export interface TaskFormModelInterface {
  sync_id?: number;
  type?: number;
  user_name?: number;
  time?: [];
}

export interface OrderSyncListResultInterface {
  list: TaskFormModelInterface[];
}

export interface OrderSyncListParamsInterface
  extends TaskFormModelInterface,
    PageInterface {}

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
}

export interface UserFormModelInterface {
  user_id?: string;
}

export interface EpUserSearchParamsInterface
  extends UserFormModelInterface,
    PageInterface {}
