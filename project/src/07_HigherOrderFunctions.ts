export { }
type apply = <A, B>(f: (a: A) => B, a: A) => B
const apply: apply = (f, a) => f(a)

type compose = <A, B, C>(f: (b: B) => C, g: (a: A) => B) => (a: A) => C
export const compose: compose = (f, g) => (a) => f(g(a))

type map = <A, B>(xs: A[], f: (a: A) => B) => B[]
export const map: map = (xs, f) => xs.map(f)
