import { categoryRequestFunction } from '../api/dictionary';
import { CategoryRequestResultInterface } from '../api/interface';
// 获取类目
let categoryArray: CategoryRequestResultInterface[];
categoryRequestFunction().then(({ data }) => {
  categoryArray = data;
});

export function findCategory(
  n: number,
  data: CategoryRequestResultInterface[] = categoryArray
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
