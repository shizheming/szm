import type { CascaderProps, SelectProps } from 'ant-design-vue';
import { cloneDeep } from 'lodash';

// 字典缓存
// 那什么时候需要更新呢？？
export const apiDictCacheObject: Partial<{
  backgroundCategoryOptions: CascaderProps['options'];
  addressOptions: CascaderProps['options'];
  goodsBrandOptions: SelectProps['options'];
  ownerSiteOptions: SelectProps['options'];
  saleModeOptions: SelectProps['options'];
  subOrgOptions: SelectProps['options'];
  supplierOptions: SelectProps['options'];
}> = {};
