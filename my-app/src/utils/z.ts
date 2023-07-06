import { categoryRequestFunction } from '../api/dictionary';
import { CategorySingleInterface } from '../api/interface';
// 获取类目
let categoryArray: CategorySingleInterface[];
categoryRequestFunction().then(({ data }) => {
  categoryArray = data;
});

// 给最后一级，寻找上面两级
export function findCategoryFunction(
  n: number,
  data: CategorySingleInterface[] = categoryArray
) {
  var result: string[] = [];

data.forEach((current) => {
    if (current.id == n) {
      result.unshift(current.name);
      if (current.pid) {
        result = findCategoryFunction(current.pid, categoryArray).concat(result);
      }
    } else {
      if (current.child) {
        result = findCategoryFunction(n, current.child).concat(result);
      }
    }
  });
  return result;
}
