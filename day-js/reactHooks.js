// 研究react hooks 原理

// class

// 由于我们的重点是hooks,我们可以尝试用hooks简单模拟一下class

class Component {
  constructor(props) {
    this.props = props;
    // this.state = {}
  }
}

function useComponent(Component) {
  return function (props) {
    const component = new Component(props);
    // 简单的规避eslitn
    let initState = useState;
    let [state, setState] = initState(component.state);
    component.props = props;
    component.state = state;
    component.setState = setState;
    console.log(component);
    return component.render();
  };
}

// react 16 核心源码 研究

// jsx简介
// createElement
// render
// Concurrent
// fibers
// 提交 commit
// Reconciliation
// 函数组件
// Hooks 核心实现
// class
