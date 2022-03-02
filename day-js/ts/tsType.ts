// ts类型

// 1、类型

// undefined
let u: undefined = undefined
// null
let n: null = null

// 布尔值 Boolean
let isBool: boolean = true

// 数字 number
let num: number = 99

// 字符串 string
let str: string = 'abc'

// 数组 array
let numArr: number[] = [1,2,3]
// 数组泛型
let list: Array<number> = [1,2,3]

// 元组 Tuple
let x: [string,number]
x = ['a',1] // ok
x = [1, 'a'] // error

// 枚举 enum
enum Color {Red,Green,Blue}
let c: Color = Color.Red

// any 任意类型
let notType: any = 1
notType = 'a'
notType = true
notType = [1,3]

// 函数 Void
function func(): void {
  console.log('-void-')
}

// Never
function error(message: string): never {
  throw new Error(message)
}

//
function fail() {
  return error('Something failed!')
}

// 2、类型断言 ==> 好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用

let someValue = 'this is a string'

// 尖括号语法
let strLength: number = (<string>someValue).length
// as 语法
let strLength: number = (someValue as string).length

// 3、接口 ==> ts核心原则之一，是对值所具有的结构进行类型检查。它有时被称为“鸭式辨型法”或“结构性子类型化”。在ts里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

interface LabelValue {
	label: string
} 

// 可选属性
interface SquareConfig {
	color?: string,
	width?: number
}

// 只读属性
interface Point {
	readonly x: number,
	readonly y: number
}

// 安徽念书类型
interface Func {
	(source: string): boolean
}

// 可索引的类型
interface StrArray {
	[index: number]: string
}

// 类类型
interface ClockInterface {
	currentTime: Date
}

// 4、泛型 ==> 我们把这个版本的 identity 函数叫做泛型，因为它可以适用于多个类型。 不同于使用 any，它不会丢失信息，像第一个例子那像保持准确性，传入数值类型并返回数值类型。

function identity<T>(arg: T): T {
	return arg
}