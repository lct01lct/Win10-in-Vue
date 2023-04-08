interface IFSMOtpions<State> {
  init?: State;
  steps: StepType<State>[];
  onStateChange?: (currState: State, prevState: State | null) => void;
}

interface StepType<State> {
  from: State;
  to: State;
  onStep?: (currState: State, prevState: State | null) => void;
}

class FSM<State> {
  private _init: State | null = null;
  private _state: State | null = null;
  private _currState: StepType<State> | null = null;
  private _prevState: StepType<State> | null = null;
  private _steps: StepType<State>[] = [];
  private _onStateChange: ((currState: State, prevState: State | null) => void) | undefined =
    undefined;

  constructor(opt: IFSMOtpions<State>) {
    const { init, steps, onStateChange } = opt;
    this._init = init!;
    this.mapSteps(steps);
    this._onStateChange = onStateChange;
    this.reset();
  }

  get state() {
    return this._state;
  }

  step() {
    if (!this._currState) {
      this.postError('Unable to go to the next step');
    }
    this._prevState = this._currState;
    const nextStep = this.findNextStep(this._currState!);

    this._currState?.onStep && this._currState?.onStep(this._currState.to, this._currState.from);
    this.triggerCb();

    this.setCurrState(nextStep);
  }

  goto(to: State) {
    const nextStep = this.findNextStep(to);

    if (!nextStep) return this.postError(`'Unable to go to the ${to} this step'`);

    this._prevState = this._currState;
    this._currState?.onStep &&
      this._currState?.onStep(to, this._prevState ? this._prevState.from : this._prevState);
    this.setCurrState(nextStep);
    if (this._currState) {
      this._onStateChange &&
        this._onStateChange(
          this._currState!.from!,
          this._prevState ? this._prevState.from : this._prevState
        );
    }

    return this;
  }

  reset() {
    if (!this._init) {
      try {
        this._state = this._steps[0].from;
        this._init = this._steps[0].from;
        this.setCurrState(this._steps[0]);
        this.triggerCb();
      } catch {
        this.postError('FSM constructor need a initival state!');
      }
    } else {
      this.setCurrState(this._steps[0]);
    }
    return this;
  }

  private mapSteps(steps: StepType<State>[]) {
    this._steps = steps;
  }

  private setCurrState(nextStep: StepType<State> | undefined) {
    if (!nextStep) {
      this._currState = null;
      this._state = this._prevState!.to || null;
    } else {
      this._currState = nextStep;
      this._state = this._currState ? this._currState.from : this._prevState!.to;
    }
  }

  private findNextStep(currState: StepType<State> | State): StepType<State> | undefined {
    return this._steps.find((item) => {
      if (typeof currState === 'object') {
        return item.from === (currState as StepType<State>).to;
      }
      return item.from === currState;
    });
  }

  private triggerCb() {
    if (this._currState) {
      this._onStateChange &&
        this._onStateChange(
          this._currState!.to!,
          this._prevState ? this._prevState.from : this._prevState
        );
    }
  }

  private postError(errStr: string) {
    throw new Error(errStr);
  }
}

export default FSM;
