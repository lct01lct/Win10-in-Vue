interface DAO {
  startTime: string; // 起始时间

  validTime: number; // 过期时间
}

interface IStatus {
  SUCCESS: 'success';
  FAILURE: 'failure';
  OVERFLOW: 'overflow';
  TIMEOUT: 'timeout';
}

interface IResult {
  status: TStatus;
  key: string;
  value: any;
}

type valueof<T extends object> = T[keyof T];
type TStatus = valueof<IStatus>;

class DAO {
  private preId: string;
  private timeSign: string;

  static preIds: string[] = [];

  static storage: Storage = localStorage || window.localStorage;

  static status: IStatus = {
    SUCCESS: 'success',
    FAILURE: 'failure',
    OVERFLOW: 'overflow',
    TIMEOUT: 'timeout',
  };

  constructor(preId: string = '', timeSign = '-|-') {
    if (!DAO.preIds.some((item) => item === preId)) {
      this.preId = preId;
      this.timeSign = timeSign;
      DAO.preIds.push(preId);
    } else {
      throw new Error('存在重复的 preId');
    }
  }

  private setKey(key: string): string {
    return this.preId + key;
  }

  private setValue(value: string, startTime: string): string {
    return startTime ? startTime + this.timeSign + value : value;
  }

  private getValue(value: string) {
    let index = value.indexOf(this.startTime ? this.timeSign : '');
    value = this.startTime ? value.slice(index + this.timeSign.length) : value;

    return value;
  }

  set(
    key: string,
    value: any,
    cb?: (status: TStatus, key: string, value: string) => void,
    time: string | Date = '',
    validTime: number = 0
  ) {
    let status: TStatus = DAO.status.SUCCESS;
    let startTime: string = '';

    if (time) {
      startTime = (new Date(time).getTime() || new Date(new Date()).getTime()) + '';
      validTime = validTime || 7 * 24 * 60 * 60; // 默认设置七天过期时间
    }

    this.startTime = startTime;
    this.validTime = validTime;
    DAO.storage.setItem(this.setKey(key), this.setValue(JSON.stringify(value), startTime));

    cb && cb.apply(this, [status, key, value]);

    return <IResult>{
      status,
      key,
      value,
    };
  }

  private findValue(
    key: string,
    successFn: (status: TStatus, value: string) => { status: TStatus; value: string }, // value 值存在的时候执行的回到函数,
    failFn: () => TStatus,
    cb?: (status: TStatus, key: string, value: string | null) => void
  ): IResult {
    let status: TStatus = DAO.status.SUCCESS;
    let value: string | null = DAO.storage.getItem(this.setKey(key));

    if (!value) {
      // status = this.status.FAILURE;
      status = failFn();
    } else {
      // value 存在
      if (successFn) {
        const successRes = successFn(status, value);
        status = successRes.status;
        value = successRes.value;
      }
    }
    cb && cb.apply(this, [status, key, value]);

    return {
      status,
      key,
      value,
    };
  }

  get(key: string, cb?: (status: TStatus, key: string, value: any) => void): IResult {
    return this.findValue(
      key,

      (status, value) => {
        // 判断是否超时
        if (
          (this.startTime && new Date().getTime() < parseInt(this.startTime) + this.validTime) ||
          !this.startTime
        ) {
          //  没超时
          value = JSON.parse(this.getValue(value));
        } else {
          // 超时
          status = DAO.status.TIMEOUT;
          value = null as unknown as string; // 将超时 value 转为 null
          this.remove(key);
        }

        return {
          status,
          value,
        };
      },

      () => {
        return DAO.status.FAILURE;
      },

      cb
    );
  }

  remove(key: string, cb?: (status: TStatus, key: string, value: string | null) => void): IResult {
    return this.findValue(
      key,

      (status, value) => {
        value = this.getValue(value);
        DAO.storage.removeItem(this.setKey(key));

        return {
          status,
          value,
        };
      },

      () => {
        return DAO.status.FAILURE;
      },

      cb
    );
  }
}

export default DAO;
