import { ListInterface, PageInterface } from '../interface';
export interface CategoryRequestResultInterface {
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
  child?: CategoryRequestResultInterface[];
}

export interface UserRequestResultInterface {
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

export interface SkuRequestParamsInterface {
  goods_search_value: string;
  goods_search_key: string;
  category_id: number;
  brand_id: number;
  sku_qty_start: number;
  sku_qty_end: number;
  category_id_array: number[];
}

export type SkuRequestParamsPageInterface = Partial<SkuRequestParamsInterface> &
  PageInterface;
export interface SkuRequestResultInterface {
  min_qty: number;
  purchaseAmount: number;
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
