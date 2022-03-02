// 遍历数组
let arr = [1,2,3,4,5,6]

// for循环 使用临时变量，将长度缓存起来，避免重复获取数组长度，当数组较大时优化效果才会比较明显。
let len = arr.length

for(let i = 0; i < len; i++) {
	console.log("-index-",i,"-value-",arr[i])
}

// every - 只要有一项不满足就为false
let everyBool1 = arr.every(val => val > 0)
let everyBool2 = arr.every(val => val > 1)
console.log("-every-return-val1-",everyBool1)
console.log("-every-return-val2-",everyBool2)

// some - 只要有一项满足就为true
let someBool1 = arr.some(val => val > 6)
let someBool2 = arr.some(val => val > 5)
console.log("-some-return-val1-",someBool1)
console.log("-some-return-val3-",someBool2)

// Map 返回新数组，不改变原数组
let mapArr = arr.map(val => val+10)
console.log("-map-return-arr-",mapArr)

// forEach 注意forEach没有返回值，本质等同于for循环，不支持continue,不支持break
let forEachVal = arr.forEach(val => val)
console.log("-forEach-return-arr-",forEachVal)

// filter 过滤，返回过滤后的数组
let filterArr = arr.filter(val => val > 1)
console.log("-filter-return-arr-",filterArr)

// find  返回数组中符合测试函数条件的第一个元素。否则返回undefined 

// findIndex 对于数组中的每个元素，findIndex 方法都会调用一次回调函数（采用升序索引顺序），直到有元素返回 true。只要有一个元素返回 true，findIndex 立即返回该返回 true 的元素的索引值。如果数组中没有任何元素返回 true，则 findIndex 返回 -1。
// findIndex 不会改变数组对象。

// keys、values、entries  可以和for...of 搭配使用

// for...of ES6语法可以正确响应break、continue、return语句

// reduce 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值。
console.time('reduce')
let totalVal = arr.reduce(function(prev,curr,index,arr) {
	return prev + curr
})
console.log("-reduce-最终的值：" + totalVal)
console.timeEnd('reduce')

// reduceRight() 功能和reduce()功能是一样的，不同的是reduceRight()从数组的末尾向前将数组中的数组项做累加
console.time('reduceRight')
let reduceRightVal = arr.reduce(function(prev,curr,index,arr) {
	return prev + curr
})
console.log('-reduceRight-最终的值：' + reduceRightVal)
console.timeEnd('reduceRight')