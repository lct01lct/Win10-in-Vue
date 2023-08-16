const middlewares: Middleware[] = [];

export type Middleware = <T extends new (...args: any[]) => any>(
  Class: T
) => new (...args: any[]) => any;

function Middle() {
  const mixinedClass = (Class: new (...args: any[]) => any) => {
    return middlewares.reduce((prevClass, mw) => {
      return mw(prevClass);
    }, Class);
  };
  return mixinedClass as ClassDecorator;
}

Middle.use = (middleware: Middleware) => {
  middlewares.push(middleware);
};

Middle.use((Class) => {
  return class extends Class {
    isFocus = false;
    isEditting = false;
  };
});

export interface Base {
  isFocus: boolean;
  isEditting: boolean;
}

export { Middle };
