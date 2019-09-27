
// Exercise

// Beginner ========================

// comp: create a function that composes two
// unary functions
type comp = <A, B, C>(
  f: (b: B) => C,
  g: (a: A) => B
) => (a: A) => C
const comp: comp = undefined

// Advanced ========================

// compose: create a function that composes an arbitrary
// number of unary functions
// Hint: use reduceRight, and don't worry about types
const compose = undefined

// Examples
const toUpperCase = (s: string): string => s.toUpperCase()
const join = (ss: string[]): string => ss.join("")
comp(comp(parseInt, toUpperCase), join)

