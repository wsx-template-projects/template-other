// let arr1 = [{ a: 1, b: 2 }];
// let arr2 = [{ a: 6, c: 2 }];
// console.log(objectArrayMerge(arr2, arr1));
var target = { f: 10 };
var obj1 = { a: 1, b: 2 };
var obj2 = { c: 1, d: 2 };
var obj3 = { h: 1, j: 2 };
var obj4 = { o: 1, u: 2 };
var newObj = objectMerge(obj1, obj2, obj3, obj4);
// var newObj = Object.assign(target, obj1, obj2, obj3, obj4);
obj1.c = 3;
obj2.c = 3;
console.log(target, obj1, newObj);
function objectMerge(...agrs) {
  console.log(agrs);
  return Object.assign({}, ...agrs);
}
