console.log("js事件循环机制原理");

console.log(1);

setTimeout(function () {
  console.log(2);
  new Promise(function (resolve) {
    console.log(3);
    resolve(4);
  }).then(function (num) {
    new Promise(function (resolve) {
      console.log(8);
      resolve(9);
    }).then(function (n) {
      console.log(n);
    });
    console.log(num);
  });
}, 300);

new Promise(function (resolve) {
  console.log(5);
  resolve(6);
}).then(function (num) {
  console.log(num);
});

setTimeout(function () {
  console.log(7);
}, 400);

// 1 5 6 2 3 8 4 9 7
