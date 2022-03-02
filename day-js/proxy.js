let obj = {
  a: 1,
  b: 2,
};

let po = new Proxy(obj, {
  set(obj, prop, val) {
    console.log(obj, prop, val);
  },
});
po.a = 6;
