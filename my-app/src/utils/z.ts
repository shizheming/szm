import dayjs from 'dayjs';
import { categoryRequestFunction } from '../api/dictionary';
import { CategorySingleInterface } from '../api/formInterface';
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
        result = findCategoryFunction(current.pid, categoryArray).concat(
          result
        );
      }
    } else {
      if (current.child) {
        result = findCategoryFunction(n, current.child).concat(result);
      }
    }
  });
  return result;
}

// 时间戳处理
export function handleTimeFunction(time: number) {
  return time ? dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
}
