const compose = (...fs) => (a) => fs.reduceRight((acc, f) => f(acc), a)

type comp = <A, B, C>(f: (b: B) => C, g: (a: A) => B) => (a: A) => C
const comp: comp = (f, g) => (a) => f(g(a))

const toUpperCase = (s: string): string => s.toUpperCase()
const join = (ss: string[]): string => ss.join("")
comp(comp(parseInt, toUpperCase), join)

