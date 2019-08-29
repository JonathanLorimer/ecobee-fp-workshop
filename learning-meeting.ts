
/*
How a developer can adopt FP in any language?
-> What are the minimum features required to 'do fp'?

What core patterns would be applicable?
-> What principles define functional programming?
*/
const fn = () => { }
const curry = () => () => { }
const speacialized = curry(value)
curry()()



/*
  - FP in the small vs in the large
      * Immutability and Purity help us reason locally
      * Composition helps us build up complex programs from simple ones
      * First class functions help us achieve generality (through HOF and currying)
      * Types help us constrain the possible states of our program, and give us visibility into our inputs and outputs; they help make sure
        our programs compose the way we intend
*/

// Immutability and Purity

// Composititon
const compose = (fn1, fn2, x) => fn1(fn2(x))

// First class functions
const compose = (fn1) => (fn2) => (x) => fn1(fn2(x))
const add = (x) => (y) => x + y

const add1After = compose(add(1))
[1, 2, 3, 4, 5].map(add1)

// Types

// Untype language from the typed language perspective
type Type = Number
  | String
  | Null

interface Number {
  type: "number"
  val: number
}

interface String {
  type: "string"
  val: string
}

interface Null {
  type: "null"
  val: null
}
