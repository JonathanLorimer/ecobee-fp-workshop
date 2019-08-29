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
const get = <A>(obj: Map<A>, key: string): Either<string, A> => {
  const val = obj[key]
  return val
    ? right<A>(val)
    : left<string>("get: That key doesn't exist in the map")
}
const perform = <A, B>(
  obj: Map<A>,
  key: string,
  fn: (a: A) => B,
): Either<string, B> => {
  const val = obj[key]
  return val
    ? right<B>(fn(val))
    : left<string>("perform: That key doesn't exist in the map")
}

type pureEither = <A>(a: A) => Either<any, A>
const pureEither: pureEither = right

type mapEither = <A, B, C>(fn: (a: B) => C, e: Either<A, B>) => Either<A, C>
const mapEither: mapEither = (f, e) => {
  switch (e.type) {
    case "left":
      return e
    case "right":
      return right(f(e.right))
  }
}
