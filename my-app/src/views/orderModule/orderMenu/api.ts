import axios from "../../../utils/axios";
import type { searchInterface } from "./interface";
export const order_list_page_api = (params: searchInterface) => {
  return axios.get<searchInterface>("/api/order", {
    params,
  });
};
