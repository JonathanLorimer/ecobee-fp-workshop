export { }
import { Maybe, just, nothing } from "./02_Maybe"

// Implement linked list...

// Exercise

// head: Dangerously get the first item out of a linked list
type head = <A>(xs: LinkedList<A>) => A
const head: head = undefined

// safeHead: same as head but handle the error case gracefully
type safeHead = <A>(xs: LinkedList<A>) => Maybe<A>
const safeHead: safeHead = undefined

// safeTail: return the end of the linked list, handle the
// error case gracefully
type safeTail = <A>(xs: LinkedList<A>) => Maybe<LinkedList<A>>
const safeTail: safeTail = undefined