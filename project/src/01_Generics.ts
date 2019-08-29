export { }

// Exercise begins here
type all = <A>(pred: (p: A) => boolean, array: A[]) => boolean
const all: all = (pred, array) => array.every(pred)

type when = <A>(pred: (p: A) => boolean, f: (a: A) => A, a: A) => A
const when: when = (pred, fn, a) => (pred(a) ? fn(a) : a)

type applyTo = <A, B>(a: A, fn: (a: A) => B) => B
const applyTo: applyTo = (a, fn) => fn(a)

type map = <A, B>(f: (f: A) => B, a: A[]) => B[]
const map: map = (f, a) => a.map(f)

type zipWith = <A, B, C>(f: (a: A, b: B) => C, as: A[], bs: B[]) => C[]
const zipWith: zipWith = (f, a, b) => a.map((e, i) => f(e, b[i]))

type compose = <A, B, C>(f: (b: B) => C, g: (a: A) => B, a: A) => C
const compose: compose = (f, g, a) => f(g(a))

// These are just test cases to ensure that you give the generic type
// for the cases above rather than the concrete versions
const length = (s: string): number => s.length
const odd = (n: number): boolean => n % 2 === 0
const length5 = (s: string): boolean => s.length <= 5
const apply = (n: number) => (f: (n: number) => number): number => f(n)
const add = (n: number) => (m: number) => n + m
const mult = (n: number) => (m: number) => n * m
const cube = (n: number) => (m: number) => n ^ m
const id = <A>(a: A): A => a

all(odd, [3, 5, 7, 13])
all(length5, ["hello", "world", "howdy", "do"])
all(id, [true, false, true, false])

when(odd, add(2), 4)

const upperWhenBiggerThanFive = (a: string) =>
  when(length5, (x) => x.toUpperCase(), a)
upperWhenBiggerThanFive("hello")

applyTo(4, add(2))
applyTo("hello", length)

map(length, ["hello", "world"])
map(odd, [1, 2, 3, 4, 5])
map(apply(2), [add(1), mult(2), cube(3)])

zipWith((x, y) => x + y, [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6])
zipWith((x, y) => x + y, ["1", "2", "3", "4", "5", "6"], [1, 2, 3, 4, 5, 6])
zipWith(
  (x, y) => x && y,
  [true, false, true, false, true, false],
  [1, 2, 3, 4, 5, 6],
)

compose(
  add(1),
  mult(2),
  4,
)
compose(
  add(5),
  cube(2),
  4,
)
compose(
  cube(3),
  mult(2),
  4,
)
