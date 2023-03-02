import { categoryRequest } from '../api/dictionary';
import { Api_goods_category_result_item_interface } from '../api/interface';
// 获取类目
let categoryArray: Api_goods_category_result_item_interface[];
categoryRequest().then(({ data }) => {
  categoryArray = data;
});

export function findCategory(
  n: number,
  data: Api_goods_category_result_item_interface[] = categoryArray
) {
  var result: string[] = [];

  data.forEach((current) => {
    if (current.id == n) {
      result.unshift(current.name);
      if (current.pid) {
        result = findCategory(current.pid, categoryArray).concat(result);
      }
    } else {
      if (current.child) {
        result = findCategory(n, current.child).concat(result);
      }
    }
  });
  return result;
}
