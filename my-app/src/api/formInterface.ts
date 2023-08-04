import { ListInterface, PageInterface } from '../interface';
// 批量修改备注
export interface BatchRequestParamsInterface {
  ids: {
    merchant_remark: string;
    osl_seq: string;
    user_id: string;
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

// 修改销售人员
export interface SaleManRequestInterface {
  osl_seq: string;
  salesman_node_id: number;
  shop_account_id: number;
  shop_user_id: number;
}
