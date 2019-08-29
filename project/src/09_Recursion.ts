export { }
const map = <A, B>([x, ...xs]: A[]) =>
  (f: (a: A) => B): B[] =>
    x === undefined
      ? []
      : [f(x), ...map<A, B>(xs)(f)]

const filter = <A>([x, ...xs]: A[]) =>
  (f: (a: A) => boolean): A[] =>
    x === undefined
      ? []
      : f(x)
        ? [x, ...filter<A>(xs)(f)]
        : [...filter<A>(xs)(f)]

const foldL = <A, B>([x, ...xs]: A[]) =>
  (f: (b: B) => (a: A) => B) =>
    (acc: B): B =>
      x === undefined
        ? acc
        : foldL<A, B>(xs)(f)(f(acc)(x))

const foldR = <A, B>([x, ...xs]: A[]) =>
  (f: (a: A) => (b: B) => B) =>
    (acc: B): B =>
      x === undefined
        ? acc
        : f(x)(foldR<A, B>(xs)(f)(acc))

