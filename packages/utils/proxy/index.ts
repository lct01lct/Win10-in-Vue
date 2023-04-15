type Fn = (...args: any[]) => any;

export const proxyFnApply = <Fun extends Fn>(
  fn: Fun,
  cb: (originFn: Fun, thisArg: any, argArr: Parameters<Fun>) => void
) => {
  return new Proxy(fn, {
    apply(originFn, thisArg, argArr: Parameters<Fun>) {
      return cb(originFn, thisArg, argArr);
    },
  });
};
