/**
 * 入口文件
 * */

/**
 * 一级菜单
 */
const MENUS_LIST = [
  {
    path: "",
    meta: {
      title: "1月份",
    },
  },
  {
    path: "",
    meta: {
      title: "2月份",
    },
  },
  {
    path: "",
    meta: {
      title: "3月份",
    },
  },
  {
    path: "",
    meta: {
      title: "4月份",
    },
  },
  {
    path: "",
    meta: {
      title: "5月份",
    },
  },
  {
    path: "",
    meta: {
      title: "6月份",
    },
  },
  {
    path: "",
    meta: {
      title: "7月份",
    },
  },
  {
    path: "",
    meta: {
      title: "8月份",
    },
  },
  {
    path: "./2021-09",
    meta: {
      title: "9月份",
    },
    children: [
      {
        path: "./2021-09/html/js之Math对象解析.html",
        meta: {
          title: "day12-Math对象",
        },
      },
      {
        path: "./2021-09/html/js之Date对象解析.html",
        meta: {
          title: "day12-Date对象",
        },
      },
    ],
  },
  {
    path: "",
    meta: {
      title: "10月份",
    },
  },
  {
    path: "",
    meta: {
      title: "11月份",
    },
  },
  {
    path: "./2021-12",
    meta: {
      title: "12月份",
    },
  },
];

/**
 * 创建节点
 * @param {string} elementTag html元素标签名
 */
function createNodeEle(elementTag, className = "") {
  // todo: 内联元素设置成块元素
  // 内联元素：a、span等
  const ele = document.createElement(elementTag);
  ele.className = "menu-item";
  ele.classList.add(...className);
  console.log("ele :>> ", ele);
  return ele;
}

/**
 * 创建一级菜单
 * @param {array} menusList 菜单配置项
 */
function createMainMenus(menusList = []) {
  let menusNodes = [];
  for (let i = 0; i < menusList.length; i++) {
    let ele = createNodeEle("div", [`menu-item-${i + 1}`, `item-${i + 1}`]);
    ele.innerHTML = menusList[i]?.meta?.title || "没有菜单名，请设置菜单名";
    ele.onclick = function (el) {
      console.log("el :>> ", el);
      console.log("click-item :>> ", menusList[i]);
      let path = menusList[i]?.path;
      window.open(path, "_black");
    };
    menusNodes.push(ele);
  }
  console.log("menusNodes :>> ", menusNodes);
  return menusNodes;
}

/**
 * 创建子菜单
 * @param parentNode 父级元素
 * @param {string | number} parentMenusId 父级菜单id
 */
function createSubMenus(parentNode, parentMenusId) {
  // do something...
}

// const HTML_SRC_DATA = {
//   1: {
//     btn_titles: ["day12-Math对象", "day13-Date对象"],
//     html_src_list: [
//       "./2021-09/html/js之Math对象解析.html",
//       "./2021-09/html/js之Date对象解析.html",
//     ],
//   },
// };

/**
 * 创建菜单
 * @param {number} month 月份
 * @param {string} elClass 菜单最外层元素类名
 */
// function createMenus(month, elClass = ".page-operate") {
//   let currMonthData = HTML_SRC_DATA[month];
//   const { btn_titles, html_src_list } = currMonthData;
//   console.log("currMonthData :>> ", currMonthData);
//   let pageOperateEl = document.querySelector(elClass);
//   for (let i = 0; i < btn_titles.length; i++) {
//     let btnEl = createBtnEl(btn_titles[i], () => {
//       // window.location.href = html_src_list[i];
//       window.open(html_src_list[i], "_black");
//     });
//     pageOperateEl.appendChild(btnEl);
//   }
// }

/**
 * 创建按钮元素
 * @param {string} btnTxt 按钮文本
 * @param {function} cb 按钮点击事件回调
 * @return 按钮元素
 */
function createBtnEl(btnTxt, cb) {
  let btnEl = document.createElement("span");
  btnEl.className = "wsx-btn";
  btnEl.classList.add("wsx-btn-primary");
  btnEl.classList.add("m-r-10");
  btnEl.innerHTML = btnTxt;
  // 给按钮添加事件
  btnEl.onclick = function () {
    cb();
  };
  return btnEl;
}

// 加载完成
window.onload = function () {
  // createMenus(1, ".page-operate");
  let parentEl = document.querySelector(".page-operate");
  let childrenEl = createMainMenus(MENUS_LIST);
  childrenEl.forEach((item) => {
    parentEl.appendChild(item);
  });
};
