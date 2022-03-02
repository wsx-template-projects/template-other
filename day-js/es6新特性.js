// 一、变量解构

// 数组解构，有位置顺序
let arr = [1, 2, 3];

let [a, b, c] = arr;

console.log("a:", a, "b:", b, "c:", c);

let [d, e] = arr;

console.log("d:", d, "e:", e);

// 对象解构，没有位置顺序，但是变量名必须与属性名同名

let obj = { name: "我是谁", age: 18, sex: "boy" };

console.log("需要解构的目标对象--", obj);

let { name } = obj;

console.log("目标对象解构属性--name", name);

let { age, ...otherObj } = obj;

console.log("目标对象解构属性--age", age);

console.log("目标对象解构其它属性--", otherObj);

// 二、字符串扩展

let str1 = "我叫str1,";

let str2 = "你是谁?";

let str = `${str1}请问${str2}`;

console.log("字符串扩展:", str);

// 扩展 ==》判断一个字符串是否包含另一个字符串

// es5 ==> indexOf
// es6 ==> includes startsWith endsWith

// includes ==> 返回布尔值， 参数字符串是否在一个字符串中出现
// startsWith ==> 返回布尔值，参数字符串是否在一个字符串的头部
// endsWith ==> 返回布尔值，参数字符串是否在一个字符串的尾部
// repeat ==> 参数字符串在一个字符串中出现的次数
