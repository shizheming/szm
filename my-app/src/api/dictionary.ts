import { ListInterface, PageInterface } from '../interface';
import axios from '../utils/axios';
import { CategoryInterface } from './interface';
import {
  SUPPLIER_API_STRING,
  CATEGORY_API_STRING,
  BRAND_API_STRING,
  DICT_API_STRING,
  SITE_API_STRING,
  ORG_API_STRING,
  AREA_API_STRING,
} from './api';

// 供应商
export const supplierRequestFunction = () => {
  return axios.get<
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
  >(SUPPLIER_API_STRING);
};

// 后台类目
export const categoryRequestFunction = () =>
  axios.get<CategoryInterface[]>(CATEGORY_API_STRING);

// 商品品牌
export const brandRequestFunction = () =>
  axios.get<{ id: number; name: string }[]>(BRAND_API_STRING);

// 通用字典
export const dictRequestFunction = (params: { type: string }) =>
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
  }>(DICT_API_STRING, { params });

// 销售站点
export const siteRequestFunction = (params: PageInterface) =>
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
  >(SITE_API_STRING, { params });

// 订单销售组织
export const orgRequestFunction = (params: PageInterface) =>
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
  >(ORG_API_STRING, {
    params,
  });

// 地址
export const areaRequestFunction = (params: { parent_id: number }) =>
  axios.get<
    {
      id: number;
      name: string;
      fullname: string;
      level: number;
      ad_code: number;
      real_name: string;
    }[]
  >(AREA_API_STRING, { params });
