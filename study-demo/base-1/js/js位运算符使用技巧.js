console.log("js位运算符使用技巧");
console.log(["?.", "??=", "||=", "&&="]);

/**
 * 一、可选链接运算符 ?. (主要用来检查空值)，若当前获取的属性不存在时，代码不再往后执行
 * 对于静态属性：object?.property
 * 对于动态属性：object?.[expression]
 */

// 例如：获取如下对象的title属性值
let obj = {
  children: [
    {
      title: "标题",
    },
  ],
};

// 一般
if (obj && obj.children && obj.children[0] && obj.children[0].title) {
  console.log(obj.children[0].title);
}

// 完美，通过为运算符处理
console.log(obj?.children?.[0]?.title);

/**
 * 对于方法的调用可以这样写：object.methods?.()
 */

let source = {
  name: "source",
  friends: ["s1", "s2", "s3"],
  getTitle: function () {
    console.log(this.name);
  },
};

source.getTitle?.(); // source
source.getData?.(); // 不会执行

/**
 * 二、逻辑与分配运算符 &&=
 * x &&= y  等同于 x && x = y
 */

/**
 * 三、逻辑或分配运算符 ||=
 * 此逻辑赋值运算符仅在左侧表达式为 false值时才赋值。
 * false值与null有所不同，因为false值可以是任何一种值：undefined，null，空字符串(双引号""、单引号’’、反引号``)，NaN，0。IE浏览器中的 document.all，也算是一个。
 * x ||= y 等同于 x || x = y
 */

/**
 * 四、逻辑空分配运算符 ??=
 * 例如：x ??= y  逻辑空值运算符仅在空值（ null 或者 undefined）时才将值分配给x，
 * 表达方式：x ??= y 等同于 x ?? x = y
 *
 *
 * 注意：x ??= y 可能看起来等效于：x = x ?? y
 * 但事实并非如此！有细微的差别。
 * 空的合并运算符（??）从左到右操作，如果x不为空，则短路。因此，如果x不为 null 或者 undefined，则永远不会对表达式y进行求值。
 * 因此，如果y是一个函数，它将根本不会被调用。因此，此逻辑赋值运算符等效于
 *
 */

/**
 * 注意：可选链接运算符的使用，可以让我们不需要再编写大量我们例子中代码即可轻松访问嵌套属性。
 * 但是IE不支持它，因此，如果需要支持该版本或更旧版本的浏览器，则可能需要添加Babel插件。
 * 对于Node.js，需要为此升级到Node 14 LTS版本，因为12.x不支持该版本。
 */
