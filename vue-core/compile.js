// new Compile(el, vm)
class Compile {
  constructor(el, vm) {
    this.$el = document.querySelector(el);

    this.$vm = vm;

    // 编译
    if (this.$el) {
      // 转换内部内容为fragment

      this.$fragment = this.node2Fragment(this.$el);
      // 执行编译
      this.compile(this.$fragment);
      // 将编译完的html结果追加到$el
      this.$el.appendChild(this.$fragment);
    }
  }
  // 将宿主元素中的代码片段拿出来遍历
  node2Fragment(el) {
    const frag = document.createDocumentFragment();
    // el中所有子元素搬家至frag中
    let child;
    while (child = el.firstChild) {
      frag.appendChild(child);
    }
    return frag;
  }
  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      // 类型判断
      if (this.isElement(node)) {
        // 元素 k-,@,:
        // console.log("编译元素" + node.nodeName);
        const nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(attr => {
          const attrName = attr.name;
          const exp = attr.value;
          if (this.isDirective(attrName)) {
            // k-text
            const dir = attrName.substring(2);
            //  执行指令
            this[dir] && this[dir](node, this.$vm, exp);
          }
          if (this.isEvent(attrName)) {
            const dir = attrName.substring(1);
            this.eventHandler(node, this.$vm, exp, dir);
          }
        });
      } else if (this.isText(node)) {
        // 编译文本
        // console.log("编译文本" + node.textContent);
        this.compileText(node);
      }
      // 递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }
  model(node, vm, exp) {
    // 指定input的value属性
    this.update(node, vm, exp, "model");
    // 视图对模型的影响
    node.addEventListener("input", e => {
      vm[exp] = e.target.value;
    });
  }
  modelUpdater(node, value) {
    node.value = value;
  }
  htmlUpdater(node, value) {
    node.innerHTML = value;
  }
  eventHandler(node, vm, exp, dir) {
    let fn = vm.$options.methods && vm.$options.methods[exp];
    if (exp && fn) {
      node.addEventListener(dir, fn.bind(vm));
    }
  }
  text(node, vm, exp) {
    this.update(node, vm, exp, "text");
  }
  html(node, vm, exp){
    this.update(node, vm, exp, "html");
  }
  isDirective(attr) {
    return attr.indexOf("k-") === 0;
  }
  isEvent(attr) {
    return attr.indexOf("@") === 0;
  }
  isElement(node) {
    return node.nodeType === 1;
  }
  isText(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }
  compileText(node) {
    // console.log(RegExp.$1);
    // node.textContent = this.$vm.$data[RegExp.$1];
    this.update(node, this.$vm, RegExp.$1, "text");
  }
  // 更新函数
  update(node, vm, exp, dir) {
    const updaterFn = this[dir + "Updater"];
    // 初始化
    updaterFn && updaterFn(node, vm[exp]);
    // 依赖收集
    new Watcher(vm, exp, function(value) {
      updaterFn && updaterFn(node, value);
    });
  }
  textUpdater(node, value) {
    node.textContent = value;
  }
}
