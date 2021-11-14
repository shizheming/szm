import crypto from 'crypto';
import _ from 'lodash';
/**
 * 判断是否存在重复区间
 * @param {Array} 开始区间a1
 * @param {Array} 结束区间a2
 */
export function isRepeatNum (a1, a2) {
  const [s1, s2] = a1;
  const [c1, c2] = a2;
  const max = [s1, c1];
  const min = [s2, c2];

  if (Math.max.apply(null, max) <= Math.min.apply(null, min)) {
    return true;
  }
  return false;
}

/**
 * 判断两数组是否相等 
 * @param {Array} arr1 
 * @param {Array} arr2 
 */
export function isRepeatArray (arr1, arr2) {
  const [s1, s2] = arr1;
  const [c1, c2] = arr2;

  if (s1 == c1) return true;
  return false;
}

/**
 * 加密方法
 * @param {*} plaintext 
 * @param {*} keyStr = 70682896e24287b0476eff2a14c148f0 //约定密钥
 * @returns 
 */
export function desEncrypt(plaintext, keyStr = '70682896') {
  const key = Buffer.from(keyStr);
  const iv = Buffer.alloc(0);
  const cipher = crypto.createCipheriv('des-ecb', key, iv);

  cipher.setAutoPadding(true);
  let ciph = cipher.update(plaintext, 'utf8', 'base64');

  ciph += cipher.final('base64');
  return ciph;
}

/**
 * 解密方法
 * @param {*} encryptText 
 * @param {*} keyStr 
 * @returns 
 */
export function desDecrypt(encryptText, keyStr = '70682896') {
  const key = Buffer.from(keyStr);
  const iv = Buffer.alloc(0);
  const decipher = crypto.createDecipheriv('des-ecb', key, iv);

  decipher.setAutoPadding(true);
  let txt = decipher.update(encryptText, 'base64', 'utf8');

  txt += decipher.final('utf8');
  return txt;
}
// 乘除
export function accMul(arg1 = 0, arg2) {
  var m = 0;
  var s1 = arg1.toString();
  var s2 = arg2.toString();

  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  );
};

// 加
export function accAdd (arg1, arg2) {
  var r1, r2, m;

  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (accMul(arg1, m) + accMul(arg2, m)) / m;
}

// 减
export function accSubtr (arg1, arg2) {
  var r1, r2, m, n;

  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) { r1 = 0; }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) { r2 = 0; }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

export function accDiv(arg1, arg2) {
  var r1 = arg1.toString();
  var r2 = arg2.toString();
  var m; var resultVal; var d = arguments[2];

  m = (r2.split('.')[1] ? r2.split('.')[1].length : 0) - (r1.split('.')[1] ? r1.split('.')[1].length : 0);
  resultVal = Number(r1.replace('.', '')) / Number(r2.replace('.', '')) * Math.pow(10, m);
  return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
}
