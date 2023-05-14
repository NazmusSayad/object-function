function bind(fn: Function, thisArg: any) {
  return function wrap() {
    return fn.apply(thisArg, arguments)
  }
}

function createObjectFunction<T = Function>(
  context: { [i: string]: any },
  base: string | Function = 'default'
): T {
  const baseFn = typeof base === 'string' ? context[base] : base
  const instance = bind(baseFn, context)

  // Copy prototype to instance
  const prototype = Object.getPrototypeOf(context)
  if (prototype !== Object.prototype) {
    Object.setPrototypeOf(instance, prototype)
  }

  // Copy properties to instance
  Object.assign(instance, context)

  return instance as T
}

export default createObjectFunction
