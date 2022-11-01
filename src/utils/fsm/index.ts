interface IStateMachine<T> {
  init?: ITransitionBase<T>[keyof ITransitionBase<T>];
  transitions: ITransitionItem<T>[];
  methods?: {
    onChangeState?: (newState: T, oldState: T) => void; // 钩子函数，当变化状态时触发
    [key: string]: ((newState: T, oldState: T) => void) | undefined; // 自定义钩子函数
  };
}

interface ITransitionBase<T> {
  from: T;
  to: T;
}

type ITransitionItem<T> = { name: string } & ITransitionBase<T>;

// 扩充 this
interface StateMachine<T> {
  [key: string]: any;
}

type IStateMap<T extends string> = {
  [P in T]: ITransitionItem<T>;
};

// 状态机类
class StateMachine<T extends string> {
  currentState: ITransitionItem<T> | null;
  map: IStateMap<T> = {} as IStateMap<T>; // 动作与状态的映射
  state: T;
  prevState: ITransitionItem<T> | null = null;

  constructor(options: IStateMachine<T>) {
    options.transitions.forEach((item) => {
      this.mapTransitions(item);
    });
    this.currentState = options.init
      ? this.map[options.init]
      : this.map[options.transitions[0].from];
    this.state = options.init || options.transitions[0].from;
    this.methods = options.methods || {};
  }

  changeState(state: T) {
    this.currentState = this.map[state] || null;
  }

  mapTransitions(transition: ITransitionItem<T>) {
    const name = transition.name;
    const from = transition.from;

    this.addState(from, transition);
    this.addTransition(name);
    this.addOnHook(name);
  }

  addState(from: T, transition: ITransitionItem<T>) {
    this.map[from] = transition;
  }

  addTransition(name: string) {
    this[name] = function () {
      if (!this.currentState) {
        this.state = this.prevState!.to!;
      } else if (name === this.currentState.name) {
        this.prevState = this.currentState;

        // 改变状态
        this.state = this.currentState.to;
        this.changeState(this.currentState.to);
      }
      // 触发change钩子函数
      const newState = this.prevState ? this.prevState.to : null;
      const oldState = this.prevState ? this.prevState.from : null;
      this.methods.onChangeState && this.methods.onChangeState(newState, oldState);

      // 触发自定义钩子函数
      const hookFuName = 'on' + camelizer(name);
      this[hookFuName]();
    };
  }

  addOnHook(name: string) {
    const hookFuName = 'on' + camelizer(name);
    this[hookFuName] = function () {
      this.methods[hookFuName] &&
        this.methods[hookFuName](this.currentState!.to, this.currentState!.from);
    };
  }
}

function camelizer(name: string) {
  return name.replace(name[0], name[0].toUpperCase());
}

export default StateMachine;
