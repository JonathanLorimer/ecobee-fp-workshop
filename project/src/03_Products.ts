import { Maybe, nothing, just } from "./02_Maybe"
export interface Tuple<A, B> {
  [0]: A
  [1]: B
  [Symbol.iterator](): any
}

type tuple = <A, B>(a: A, b: B) => Tuple<A, B>
export const tuple: tuple = (a, b) => [a, b]

// Exercises

// Beginner ===================================

// fst: get the first element out of a tuple
type fst = <A>(t: Tuple<A, any>) => A
const fst: fst = undefined

// snd: get the second element out of a tuple
type snd = <B>(t: Tuple<any, B>) => B
const snd: snd = undefined

// Intermediate ===================================

// AssocList is a helper type that is an array of tuples
type AssocList<A, B> = Array<Tuple<A, B>>

// emptyAssoc: create an empty list of tuples
type emptyAssoc = <A, B>() => AssocList<A, B>
const emptyAssoc: emptyAssoc = undefined

// insertAssoc: append a tuple to an assocList
type insertAssoc = <A, B>(
  xs: AssocList<A, B>,
  t: Tuple<A, B>,
) => AssocList<A, B>
const insertAssoc: insertAssoc = undefined

// lookupAssoc: lookup the second item in the tuple by the first
// Hint: the tuple might not exist, and you must handle this case
const lookupAssoc = <A, B>(xs: AssocList<A, B>, a: A): Maybe<B> => undefined

// stringLengthAssoc: take a string and insert a tuple
// of the string and its length into an assocList
type stringLengthAssoc = (
  assoc: AssocList<string, number>,
  s: string,
) => AssocList<string, number>
const stringLengthAssoc: stringLengthAssoc = (assoc = emptyAssoc(), s) => undefined


// Advanced ===================================

// zipAssoc: take two normal arrays, and zip them together into an assoc list
const zipAssoc = <A, B>(as: A[], bs: B[]): AssocList<A, B> => undefined
