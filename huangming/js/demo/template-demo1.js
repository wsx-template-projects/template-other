
let app = new Vue({
  el:'#app',
  data:{
    count: 123,
    computedCount: 456,
  },
  methods: {
    onAdd(){
      console.log(this.count)
    },
    onSub(){},
    onReset(){},
  }
})
