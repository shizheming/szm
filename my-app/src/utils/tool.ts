import CryptoJS from 'crypto-js';
import { isNumber, isString, last } from 'lodash';
import { api_goods_category } from '../api/dictionary';
import { Api_goods_category_result_item_interface } from '../api/interface';
const keyHex = CryptoJS.enc.Utf8.parse('70682896');

/**
 * 加密方法
 * @param {*} encryptText
 * @param {*} keyHex
 * @returns
 */
export const encrypt = (encryptText: any) => {
  const encrypted = CryptoJS.DES.encrypt(encryptText, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const optionsEnum = (obj: { [name: string]: any }) => {
  const values = Object.values(obj);

  let result = [];
  if (isNumber(last(values))) {
    for (let key in obj) {
      result.push({
        label: key,
        value: obj[key],
      });
    }
    result = result.reverse();
    result.length = result.length / 2;
  } else {
    for (let key in obj) {
      result.push({
        label: key,
        value: obj[key],
      });
    }
  }
  return result;
};

// 获取类目
let categoryArray: Api_goods_category_result_item_interface[];
api_goods_category().then(({ data }) => {
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
