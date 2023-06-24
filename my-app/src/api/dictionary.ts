import { ListInterface, PageInterface } from '../interface';
import axios from '../utils/axios';
import {
  CategorySingleInterface,
  SupplierSingleInterface,
  BrandSingleInterface,
  DictRequestResultInterface,
  SiteRequestResultInterface,
  OrgRequestResultInterface,
  AddressSingleInterface,
} from './interface';
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
  return axios.get<SupplierSingleInterface[]>(SUPPLIER_API_STRING);
};

// 后台类目
export const categoryRequestFunction = () =>
  axios.get<CategorySingleInterface[]>(CATEGORY_API_STRING);

// 商品品牌
export const brandRequestFunction = () =>
  axios.get<BrandSingleInterface[]>(BRAND_API_STRING);

// 通用字典
export const dictRequestFunction = (params: { type: string }) =>
  axios.get<DictRequestResultInterface>(DICT_API_STRING, { params });

// 销售站点
export const siteRequestFunction = (params: PageInterface) =>
  axios.get<SiteRequestResultInterface>(SITE_API_STRING, { params });

// 订单销售组织
export const orgRequestFunction = (params: PageInterface) =>
  axios.get<OrgRequestResultInterface>(ORG_API_STRING, {
    params,
  });

// 地址
export const areaRequestFunction = (params: { parent_id: number }) =>
  axios.get<AddressSingleInterface[]>(AREA_API_STRING, { params });
