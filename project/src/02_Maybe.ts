export { }
import { Map } from "../lib/Map"

// Types
interface Nothing {
  nothing: null
  type: "nothing"
}
type nothing = () => Nothing
export const nothing: nothing = () => ({ nothing: null, type: "nothing" })

interface Just<A> {
  just: A
  type: "just"
}
type just = <A>(a: A) => Just<A>
export const just: just = (a) => ({ just: a, type: "just" })

export type Maybe<A> = Just<A> | Nothing

// Exercises

// Beginner ================================

// get: function that takes an object and a key and looksup that
// key in the object
// Hint: this maybe returns a value and you must handle the failure case
const get = <A>(obj: Map<A>, key: string): Maybe<A> => { }

// perform: same as get, but takes a function and applies that function
// if the key exists in the object
const perform = <A, B>(obj: Map<A>, key: string, fn: (a: A) => B): Maybe<B> => { }

// pureMaybe: a function that takes a value and puts it in a maybe
// context
// Hint: you have already seen a function suspiciously similar to this
type pureMaybe = <A>(a: A) => Maybe<A>
const pureMaybe: pureMaybe = undefined

// Intermediate ================================

// mapMaybe: a function that takes a maybe value, and maps a
// function over it if it exists, otherwise it does nothing
type mapMaybe = <A, B>(fn: (a: A) => B, m: Maybe<A>) => Maybe<B>
const mapMaybe: mapMaybe = undefined
