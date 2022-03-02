// 数组特性
console.log(111)
function deepClone() {
  let a = { name: 1 }
  let b = { ...a }
  let c = JSON.parse(JSON.stringify(a))
  a.name = 3
  c.name = 10
  console.log(a, b, c)
}
deepClone()

// 深克隆



js字符串方法

// substring


// indexOf/lastIndexOf  ==> 查找字符,若没有返回-1,若存在返回下标


// replace



//toString(params) ==> number类型转化成字符串 params（取值2-36，可选表示进制），默认为10


// +new Date()  ==> 返回时间戳 等同于 new Date().getTime()     Date.now()



// 数组方法 

// slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。