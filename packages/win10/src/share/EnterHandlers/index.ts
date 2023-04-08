class EnterHandlers {
  thenCbs: (() => Promise<0>)[] = [];
  res = Promise.resolve(0);
  cb: Function = () => {};
  docKeydownHandler: (e: KeyboardEvent) => void;

  constructor() {
    this.docKeydownHandler = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        this.cb();
      }
    };
    document.addEventListener('keydown', this.docKeydownHandler);
  }

  addEnterListener(fn: Function) {
    // 绑定回车事件
    this.thenCbs.push(() => {
      return new Promise((resolve) => {
        this.cb = () => {
          fn();
          resolve(0);
        };
      });
    });

    return this;
  }

  addLastEnterListener(fn: Function) {
    // 执行完立即删除整个回车事件
    this.addEnterListener(() => {
      fn();
      document.removeEventListener('keydown', this.docKeydownHandler);
    });

    return this;
  }

  notify() {
    // 发布
    for (let i = 0; i < this.thenCbs.length; i++) {
      this.res = this.res.then(this.thenCbs[i]);
    }

    return this;
  }
}

export default EnterHandlers;
