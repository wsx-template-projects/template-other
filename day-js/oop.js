// js面向对象7大原则

// 一、单一职责原则

// 优点：

// 1.降低类的复杂度，一个类只负责一个职责。这样写出来的代码逻辑肯定要比负责多项职责简单得多。

// 2.提高类的可读性，提高系统的可维护性。

// 3.降低变更引起的风险。变更是必然的，如果单一职责原则遵守得好，当修改一个功能的时候可以显著降低对其他功能的影响。

// 需要说明的一点是，单一职责原则不只是面向对象编程思想所特有的，只要是模块化的程序设计，都适用单一职责原则。比如说单一职责原则不仅仅适用于类，还适用于方法

// 二、开闭原则 (对扩展开放，对修改关闭)

// 定义： 对扩展开放，对修改关闭。详细描述一下就是：添加一个新的功能时，应该在已有代码的基础上扩展代码（新增模块、类、方法等），而非修改已有代码（修改模块、类、方法等）。

//一个面向对象的JS例子，很好的支持了开闭原则

function HtmlControl(options) {
  //定义一个方法
  var el = {};
  // var el = options.element; //el赋值为dom元素
  //下面是为el元素添加参数样式
  el.width = options.width;

  el.height = options.height;

  el.top = options.top;

  el.background = options.background;

  // el.innerHTML = options.text;
  console.log(el);
}

var option = {
  //为方法定义一个参数对象

  // element: document.getElementById("test"),

  left: 50,

  top: 0,

  width: 100,

  height: 200,

  background: "#ccc",

  text: "什么是开闭原则",
};

option.background = "red"; //对参数对象进行扩展

HtmlControl(option); //调用

// 这个例子的意思就是说封装一个功能，这个功能有默认参数，对外提供接口，接口参数可扩展改变，但是需要修改功能是不可以的，也就是说在功能接口内扩展修改该功能，就可以得到不同的效果。

// 扩展方法：多态、基于接口而非实现编程、依赖注入、以及大部分设计模式(例如：装饰、策略、模板、职责链、状态等)
// 注意--最主要的是，要时刻具备扩展意识、抽象意识、封装意识。编码时多向前思考，可能会有哪些需求变更，在碰到考虑不全的情况下，可以通过不断重构来保持代码的可扩展性

// 三、里氏替换原则 (通俗说：所有引用父类的地方都可以替换为他的子类)
// 例如：

// 定义会飞的鸟类
class CanFly {
  constructor(name) {
    this.name = name;
  }
  canFly() {
    console.log(`我是${this.name} I can fly!`);
  }
}

// 定义不会飞的鸟类
class NoCanFly {
  constructor(name) {
    this.name = name;
  }
  noCanFly() {
    console.log(`我是${this.name} I no can fly!`);
  }
}

// 定义老鹰类
class LaoYing extends CanFly {
  constructor(name, color) {
    super(name);
    this.color = color;
  }
  color() {
    console.log(this.color);
  }
}

// 定义鸵鸟类
class TuoNiao extends NoCanFly {
  constructor(name, color) {
    super(name);
    this.color = color;
  }
  color() {
    console.log(this.color);
  }
}

let ly1 = new LaoYing("老鹰1", "白色");
let ly2 = new CanFly("老鹰2");

ly1.canFly();
ly2.canFly();

// 四、接口隔离原则 (用多个专门的接口，而不是使用单一的总接口，尽量细化接口，接口中的方法尽量少，但是注意要适度、适度、适度)

// 实例：比如动物都会吃，但是不同的动物会不同的技能

// 共同点
// 不同点
