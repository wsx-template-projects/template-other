/**
 * 开发插件
 * 1、先创建元素节点
 * 2、把元素节点挂载到对应的节点上
 * 3、暴露出去一个对象，该对象中有一个install方法
 */

const LoadingComponent = {
  template: `
        <div class="hx-loading-mask" v-show="isShow">
            <div class="hx-loading">
                <span class="hx-loading__spinner hx-loading__spinner--circular">
                    <svg class='hx-loading__circular' viewBox="25 25 50 50">
                        <circle cx="50" cy="50" r="20" fill="none" />
                    </svg>
                </span>
                <span class="hx-loading-text">{{ text }}</span>
            </div>
        </div>
    `,
  name: "",
  data() {
    return {};
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
    },
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  components: {},
};

const LoadingPlugins = {
  install: function (Vue, options = {}) {
    const Profile = Vue.extend(LoadingComponent);
    let $vm = new Profile();
    $vm.$mount(document.createElement("div"));
    // document.documentElement.appendChild($vm.$el);
    let containerEl = document.documentElement;

    const loading = {
      show(text, className) {
        if (className) {
          containerEl = document.querySelector(className);
        }
        console.log("containerEl :>> ", containerEl);
        if (!containerEl) {
          console.error(
            "当前挂载的元素不存在，可能是在created生命函数中执行了方法，请替换成在mounted生命函数中执行方法!"
          );
        } else {
          containerEl.style.position = "relative";
          containerEl.appendChild($vm.$el);
          $vm.isShow = true;
          $vm.text = text;
        }
      },
      hide() {
        $vm.isShow = false;
        $vm.text = "";
        destroyLoading();
      },
    };

    // 销毁loading元素节点
    function destroyLoading() {
      $vm.$destroy();
      containerEl && containerEl.removeChild($vm.$el);
    }

    Vue.prototype.$loading = loading;
  },
};

Vue.use(LoadingPlugins);

// window.Loading = LoadingPlugins;
