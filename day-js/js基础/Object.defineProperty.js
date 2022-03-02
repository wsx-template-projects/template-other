console.log("-深入浅出-Object.defineProperty-开始-");

// 对象的定义与赋值
// ==》经常使用的定义与赋值方法 obj.attr = value 或者 obj['attr'] = value

let Person = {};

Person.name = "大家都叫我javaScript!";
Person["birth"] = "诞生于1995年!";
console.log(Person.name);
console.log(Person["birth"]);

// Object.defineProperty() 语法说明
// Object.defineProperty() 的作用就是直接在一个对象上定义一个新属性，或者修改一个已经存在的属性

// Object.defineProperty(obj, attr, desc);
// 1、obj —— 需要定义属性的当前对象
// 2、attr —— 当前需要定义的属性名
// 3、desc —— 属性描述符
// ==》一般通过为对象赋值的情况下，对象的属性可以修改耶可以删除，但是通过 Object.defineProperty() 定义属性，通过描述符的设置可以进行更精准的控制对象属性。

console.log("-深入浅出-Object.defineProperty-结束-");
