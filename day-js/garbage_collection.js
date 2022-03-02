// js 垃圾回收机制解析 ==》参考网址：https://www.cnblogs.com/zhwl/p/4664604.html

// 一、垃圾回收的必要性

// 二、垃圾回收原理浅析
// ==> 1、标记清除；2、引用计数

// 三、减少js垃圾回收
// 首先,new关键字就意味着一次内存的分配, 例如 new Foo(),
// 最好的处理方法是: 在初始化的时候创建新的对象,在后续的过程中尽量多的重用这些创建好的对象;
// 其次还有三种分配内存的分配表达式(不像new关键字那么明显)
// {} 创建一个对象
// [] 创建一个数组
// function () {} 创建一个新的方法,注意:创建方法也会导致垃圾收集!!!

// 1、对象的object优化

// 四、总结