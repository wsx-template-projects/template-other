// 接口 - interface

interface Person {
  name: string,
  age?: number,
  readonly hh: string, // 只读不可修改
  eat: (data: string) => string,
  [propsName: string]: any // 其中propsName指索引签名，表示接口非必须实现，propsName也可以叫abc都行，自行定义
}

let p1: Person = {
  name: '小王',
  age: 22,
  hh: '不要修改我',
  eat: (data: string) => {
    return data
  },
  sex: '男'
}

console.log(p1)
