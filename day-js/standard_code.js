// 标准代码编写 - 编写优雅的js代码 ==》https://juejin.cn/post/6844904186354597895

// 1、不建议修改变量所保存值得类型

// bad
let msg = 'hello'
msg = 123 // 有效，不推荐

// good
let str = 'hello'
str = 'hello world'

// 2、缓存变量 （例如：数组的长度,避免每次循环都去查找数组并计算长度）

let arr = [1,2,3,4,5,6]

// bad
for(let i = 0; i < arr.length; i++) {
	console.log(i,arr[i])
}

// good
let len = arr.length
for(let i = 0; i < len; i++) {
	console.log(i,arr[i])
}

// 3、关于if语句

// a、始终是用代码块，即使是执行一行代码，便于他人清楚的知道不同条件下要执行的语句

if (age < 18)
	alert('年龄小于18!')
else {
	alert('年龄大于等于18!')
}

// b、三元运算符简化简单的if条件语句

let toastMsg = ''

// bad
if (age < 18) {
	toastMsg = '未成年'
} else {
	toastMsg = "我已经是大人了"
}

// good
toastMsg = age < 18 ? '未成年' : '我已经是大人了';

// c、优化嵌套的条件语句

// bad
if (index === 0) {
	fn0()
} else if (index === 1) {
	fn1()
} else {
	fn()
}

// good 
switch (index) {
	case 0:
		fn0()
		break;
	case 1:
		fn1()
		break;
	default:
		fn()
		break;
}

// beautiful  或者使用对象的方法替代：

let idxObj = {
	0: fn0,
	1: fn1,
	2: fn
}

if