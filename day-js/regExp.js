// [] 表示匹配的范围，{} 表示匹配的长度
// [0-9]{0,9} 长度为0~9的数字字符串
// (0-9) 匹配0-9本身， [0-9]*匹配数字，可以为空；[0-9]+ 匹配数字，不能为空


// 正则

// replace()
let name = '"a", "b", ""'
    name.replace(/"([^"]*)"/g, "'$1'")
    console.log(name)