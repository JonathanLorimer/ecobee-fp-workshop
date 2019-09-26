export { }

type when = (pred, f, a) => any
const when: when = (pred, fn, a) => (pred(a) ? fn(a) : a)

// Exercise begins here

// Beginner ============================================
type all = (pred: (a: string) => boolean, array: string[]) => boolean
const all: all = (pred, array) => array.every(pred)

type applyTo = (a: string, fn: (a: string) => string) => string
const applyTo: applyTo = (a, fn) => fn(a)


// Intermediate ========================================
type map = (f: (s: string) => number, a: string[]) => number[]
const map: map = (f, a) => a.map(f)

type zipWith = (f: (s: string, n: number) => boolean
  , as: string[]
  , bs: number[]
) => boolean[]
const zipWith: zipWith = (f, a, b) => a.map((e, i) => f(e, b[i]))

// Advanced ===========================================
type compose =
  (f: (s: string) => number
    , g: (n: number) => string
    , a: number
  ) => any
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
