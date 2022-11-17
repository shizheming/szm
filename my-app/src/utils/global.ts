import type { CascaderProps, SelectProps } from 'ant-design-vue';

export const apiDictCacheObject: Partial<{
  backgroundCategoryOptions: CascaderProps['options'];
  addressOptions: CascaderProps['options'];
  goodsBrandOptions: SelectProps['options'];
  ownerSiteOptions: SelectProps['options'];
  saleModeOptions: SelectProps['options'];
  subOrgOptions: SelectProps['options'];
  supplierOptions: SelectProps['options'];
}> = {};