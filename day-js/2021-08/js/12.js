console.log("每日-js课题:", "Math对象");
console.log("\n");
console.log(`今天是${new Date("2021/9/12 22:36")}`);

console.log("\n");
console.log(
  "Math对象:",
  Math,
  "\n",
  "注意Math对象没有类，因此不能通过new操作符实例化，可以直接通过Math对象调用其方法，例如：Math.random()"
);

console.log("\n");
const pi = Math.PI;
console.log("圆周率:", pi);

console.log("\n");
const random = Math.random();
console.log("随机数:", random);

console.log("\n");
const round1 = 1.9;
console.log("round1:", round1);
const mathRound1 = Math.round(round1);
console.log("round1四舍五入:", mathRound1);
const round2 = 1.49;
console.log("round2:", round2);
const mathRound2 = Math.round(round2);
console.log("round2四舍五入:", mathRound2);

console.log("\n");
const targe1 = "1.86";
console.log("targe1:", targe1);

const ceil = Math.ceil(targe1);
console.log("targe1向上取整:", ceil);

const floor = Math.floor(targe1);
console.log("targe1向下取整:", floor);

console.log("\n");
const targe2 = -1.6;
console.log("targe2值:", targe2);
const abs = Math.abs(targe2);
console.log("targe2绝对值:", abs);

console.log("\n");
const x = 2;
const y = 3;
console.log("x:", x, "y:", y);
const pow = Math.pow(x, y);
console.log("x的y次幂:", pow);

console.log("\n");
const targe3 = 9;
console.log("targe3值:", targe3);
const sqrt = Math.sqrt(targe3);
console.log("targe3平方根:", sqrt);

// Math对象属性	描述
// E	返回算术常量 e，即自然对数的底数（约等于2.718）。
// LN2	返回 2 的自然对数（约等于0.693）。
// LN10	返回 10 的自然对数（约等于2.302）。
// LOG2E	返回以 2 为底的 e 的对数（约等于 1.414）。
// LOG10E	返回以 10 为底的 e 的对数（约等于0.434）。
// PI	返回圆周率（约等于3.14159）。
// SQRT1_2	返回返回 2 的平方根的倒数（约等于 0.707）。
// SQRT2	返回 2 的平方根（约等于 1.414）。
// abs(x)	返回数的绝对值。
// acos(x)	返回数的反余弦值。
// asin(x)	返回数的反正弦值。
// atan(x)	以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。
// atan2(y,x)	返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。
// ceil(x)	对数进行上舍入。
// cos(x)	返回数的余弦。
// exp(x)	返回 e 的指数。
// floor(x)	对数进行下舍入。
// log(x)	返回数的自然对数（底为e）。
// max(x,y)	返回 x 和 y 中的最高值。
// min(x,y)	返回 x 和 y 中的最低值。
// pow(x,y)	返回 x 的 y 次幂。
// random()	返回 0 ~ 1 之间的随机数。
// round(x)	把数四舍五入为最接近的整数。
// sin(x)	返回数的正弦。
// sqrt(x)	返回数的平方根。
// tan(x)	返回角的正切。
// toSource()	返回该对象的源代码。
// valueOf()	返回 Math 对象的原始值。
