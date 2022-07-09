import CryptoJS from "crypto-js";

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
