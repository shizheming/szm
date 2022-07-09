import CryptoJS from "crypto-js";
import { isNumber, isString, last } from "lodash";

const keyHex = CryptoJS.enc.Utf8.parse("70682896");

/**
 * 加密方法
 * @param {*} encryptText
 * @param {*} keyHex
 * @returns
 */
export const encrypt = (encryptText) => {
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
        label: obj[key],
        value: key,
      });
    }
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