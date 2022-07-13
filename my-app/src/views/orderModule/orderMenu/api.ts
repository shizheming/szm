import axios from "../../../utils/axios";
import type { formModelInterface, responseInterface } from "./interface";
export const order_list_page_api = (params: formModelInterface) => {
  return axios.get<responseInterface>("/api/order?page=1&page_size=10", {
    params,
  });
};
