export { }
import { Maybe, just, nothing } from "./02_Maybe"

type Nil = null
const nil = (): Nil => null
interface Cons<A> {
  [0]: A
  [1]: LinkedList<A>
}
type cons = <A>(fst: A, snd: LinkedList<A>) => Cons<A>
const cons: cons = (fst, snd) => [fst, snd]

type LinkedList<A> = Cons<A> | Nil

const nats: LinkedList<number> = cons(1, cons(2, cons(3, cons(4, nil()))))
const nats2: LinkedList<number> = [1, [2, [3, [4, [5, nil()]]]]]

type head = <A>(xs: LinkedList<A>) => A
const head: head = (xs) => xs[0]

type safeHead = <A>(xs: LinkedList<A>) => Maybe<A>
const safeHead: safeHead = (xs) => (xs ? just(xs[0]) : nothing())

type safeTail = <A>(xs: LinkedList<A>) => Maybe<LinkedList<A>>
const safeTail: safeTail = (xs) => (xs ? just(xs[1]) : nothing())
