const memoizee = require('memoizee');

export function Memoize(options?: Parameters<typeof memoizee>[1]) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalFn = descriptor.value;
    const memoizedFn = memoizee(originalFn, options);
    descriptor.value = function (...args: any[]) {
      return memoizedFn.apply(this, args);
    };
  };
}