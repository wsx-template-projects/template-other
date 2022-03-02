// js任务机制 - 解析 - 事件循环机制(event loop)
// 执行顺序 - 主线任务 - 微任务 - 宏任务

// 微任务(microtask) Promise.then  mutation observe
// 宏任务(task)  setTimeout

// 注意：1、所有微任务执行的时候，当前执行栈的代码必须全部执行完毕
// 注意：2、所有的微任务都会在下一个宏任务之前全部执行完毕

console.log("script start");
setTimeout(() => {
  console.log(1);
});
new Promise(function (resolve) {
  console.log(2);
  resolve();
}).then(() => {
  console.log(3);
});
console.log(4);
new Promise(function (resolve) {
  console.log(5);
  resolve();
}).then(() => {
  console.log(6);
});
setTimeout(() => {
  console.log(7);
});
function bar() {
  console.log(8);
  foo();
}
function foo() {
  console.log(9);
}
console.log(10);
bar();
console.log("script end");
