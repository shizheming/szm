import CryptoJS from 'crypto-js';
import { isNumber, isString, last } from 'lodash';
import { RouteRecordRaw, RouteRecord } from 'vue-router';

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

// 把枚举变成options
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

// 重新组合路由层级，配的时候其实是假的嵌套路由，把路由打平
export const flatRouter = (router: RouteRecordRaw[]) => {
  router.forEach((current) => {
    current.meta!.type = 'menu';
    let resultArray: RouteRecordRaw[] = [];
    current.children.forEach((item) => {
      item.children?.forEach((the) => {
        the.path = `${item.path}/${the.path}`;
        the.meta!.menuIsHidden = true;
      });
      if (item.children) {
        resultArray = resultArray.concat(item.children!);
        delete item.children;
      }
    });
    current.children = current.children?.concat(resultArray);
  });
};
