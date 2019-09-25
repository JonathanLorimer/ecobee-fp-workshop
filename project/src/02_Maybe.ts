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
const get = <A>(obj: Map<A>, key: string): Maybe<A> => { }

const perform = <A, B>(obj: Map<A>, key: string, fn: (a: A) => B): Maybe<B> => { }

type pureMaybe = <A>(a: A) => Maybe<A>
const pureMaybe: pureMaybe = undefined

type mapMaybe = <A, B>(fn: (a: A) => B, m: Maybe<A>) => Maybe<B>
const mapMaybe: mapMaybe = undefined
