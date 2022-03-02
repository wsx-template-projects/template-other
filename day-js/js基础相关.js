console.log("js基础");

// 函数的创建

// 1、命令式
function foo() {
  console.log("这是foo函数");
}
// 2、声明式

var bar = function () {
  console.log("声明了一个bar函数");
};

// 函数调用

foo();

bar();

// 注意，没有调用的函数，其代码不会执行
