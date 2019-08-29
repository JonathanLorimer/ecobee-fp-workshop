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
const get = <A>(obj: Map<A>, key: string): Maybe<A> => {
  const val = obj[key]
  return val ? just<A>(val) : nothing()
}
const perform = <A, B>(obj: Map<A>, key: string, fn: (a: A) => B): Maybe<B> => {
  const val = obj[key]
  return val ? just<B>(fn(val)) : nothing()
}

type pureMaybe = <A>(a: A) => Maybe<A>
const pureMaybe: pureMaybe = just

type mapMaybe = <A, B>(fn: (a: A) => B, m: Maybe<A>) => Maybe<B>
const mapMaybe: mapMaybe = (f, m) => {
  switch (m.type) {
    case "nothing":
      return m
    case "just":
      return just(f(m.just))
  }
}
