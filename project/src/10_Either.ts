export { }
import { Map } from "../lib/Map"

type Either<A, B> = Left<A> | Right<B>
interface Left<A> {
  type: "left"
  left: A
}
interface Right<B> {
  type: "right"
  right: B
}
const left = <A>(a: A): Left<A> => ({ type: "left", left: a })
const right = <B>(b: B): Right<B> => ({ type: "right", right: b })

// Exercises

// Beginner ================================================

// get: gets a value from an object by key, and returns an error
// message if it doesn't exist
const get = <A>(obj: Map<A>, key: string): Either<string, A> => undefined

// perform: same as get but runs a function on the value
// from the object
const perform = <A, B>(
  obj: Map<A>,
  key: string,
  fn: (a: A) => B,
): Either<string, B> => undefined

// pureEither: wraps a value in a minimal either context
type pureEither = <A>(a: A) => Either<any, A>
const pureEither: pureEither = undefined

// Advanced ===============================================

// mapEither: if the Either is a left then ignore it, otherwise
// run a function on it and wrap that back in the either
type mapEither = <A, B, C>(fn: (a: B) => C, e: Either<A, B>) => Either<A, C>
const mapEither: mapEither = undefined
