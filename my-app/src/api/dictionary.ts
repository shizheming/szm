import { ListInterface, PageInterface } from '../interface';
import axios from '../utils/axios';
import { Api_goods_category_result_item_interface } from './interface';

// 供应商
export const api_stock_supplier_get__all_list = () =>
  axios.get<
    {
      id: number;
      name: string;
      code: string;
      status: number;
      stock_check_type: number;
      is_self: number;
      finance_code: string;
      identity_type: number;
    }[]
  >('/api/stock/supplier/get-all/list');

// 后台类目
export const api_goods_category_controller = new AbortController();
export const api_goods_category = () =>
  axios.get<Api_goods_category_result_item_interface[]>('/api/goods/category', {
    signal: api_goods_category_controller.signal,
  });

// 商品品牌
export const api_goods_brand_list = () =>
  axios.get<{ id: number; name: string }[]>('/api/goods/brand/list');

// 通用字典
export const api_order_dict = (params: { type: string }) =>
  axios.get<{
    [key: string]: {
      type: string;
      parent_code: string;
      code: string;
      value: string;
      remark: string;
      rank: number;
      enterprise_id: number;
    }[];
  }>('/api/order/dict', { params });

// 销售站点
export const api_sys_site = (params: PageInterface) =>
  axios.get<
    ListInterface<{
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
    }>
  >('/api/sys/site', { params });

// 订单销售组织
export const api_sys_org = (params: PageInterface) =>
  axios.get<
    ListInterface<{
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
    }>
  >('/api/sys/org', {
    params,
  });

// 地址
export const api_common_area_controller = new AbortController();
export const api_common_area = (params: { parent_id: number }) =>
  axios.get<
    {
      id: number;
      name: string;
      fullname: string;
      level: number;
      ad_code: number;
      real_name: string;
    }[]
  >('/api/common/area', {
    signal: api_goods_category_controller.signal,
    params,
  });
