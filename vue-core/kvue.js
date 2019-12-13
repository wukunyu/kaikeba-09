class Kvue {
  constructor(options) {
    this.$options = options;
    //数据响应化
    this.$data = options.data;
    this.observe(this.$data);

    // // 模拟watcher
    // new Watcher();
    // this.$data.test;
    // this.$data.foo.bar;

    new Compile(options.el, this);

    // created执行
    if (options.created) {
      options.created.call(this);
    }
  }

  observe(value) {
    if (!value || typeof value !== "object") {
      return;
    }
    //遍历对象
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key]);
      // 代理data中的属性到vue实例上
      this.proxyData(key);
    });
  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      }
    });
  }
  // 数据响应化
  defineReactive(obj, key, val) {
    this.observe(val); // 递归解决数据嵌套

    const dep = new Dep();

    Object.defineProperty(obj, key, {
      // 数据劫持/*  */
      get() {
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return;
        } else {
          val = newVal;
          console.log(`${key}属性更新了，新的值是${val}`);
          dep.notify();
        }
      }
    });
  }
}

// Dep: 用来管理watcher
class Dep {
  constructor() {
    // 存放若干依赖
    this.deps = [];
  }
  addDep(dep) {
    this.deps.push(dep);
  }
  notify() {
    this.deps.forEach(dep => {
      dep.update();
    });
  }
}

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    Dep.target = this; //将当前watcher实例指定到Dep静态属性target
    this.vm[this.key]; //触发getter，添加依赖
    Dep.target = null;
  }
  update() {
    this.cb.call(this.vm, this.vm[this.key]);
    console.log("属性更新了");
  }
}
