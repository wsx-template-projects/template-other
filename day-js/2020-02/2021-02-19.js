// 改变原数组的方法 ==》push、pop、shift、unshift、sort、reverse、splice
// 问题一：通过改变原数组，实现去掉数组中指定的元素 ==》数组的元素可以为复杂类型
let arr1 = [1, 2, 2, 3, 4, 2]; // 去掉 2 ==> [1,3,4]
let arr2 = [{ name: 1 }, { name: 2 }, { name: 2 }, { name: 4 }]; // 去掉 { name: 2 } ==> [{ name: 1 },{ name: 4 }]

function removeArrValueFunc1(arr, item) {}

// 不改变原数组的方法 ==》concat、join、slice、
// 方法一
let result1 = arr1.filter((val) => val != 2);
console.log("-result1-", result1);
