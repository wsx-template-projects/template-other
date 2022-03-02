/**
 * 数组扁平化处理， 类似于  js  flat
 */
function flatten(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      newArr = newArr.concat(flatten(arr[i]));
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(flatten([1, 2, [5, 6, [7, 8, [4, 5]], 10]]));
