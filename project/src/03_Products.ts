import { Maybe, nothing, just } from "./02_Maybe"
export interface Tuple<A, B> {
  [0]: A
  [1]: B
  [Symbol.iterator](): any
}

type tuple = <A, B>(a: A, b: B) => Tuple<A, B>
export const tuple: tuple = (a, b) => [a, b]

// Exercise

type fst = <A>(t: Tuple<A, any>) => A
const fst: fst = (t) => t[0]

type snd = <B>(t: Tuple<any, B>) => B
const snd: snd = (t) => t[1]

type AssocList<A, B> = Array<Tuple<A, B>>

type emptyAssoc = <A, B>() => AssocList<A, B>
const emptyAssoc: emptyAssoc = () => []

type insertAssoc = <A, B>(
  xs: AssocList<A, B>,
  t: Tuple<A, B>,
) => AssocList<A, B>
const insertAssoc: insertAssoc = (xs, t) => [...xs, t]

const lookupAssoc = <A, B>(xs: AssocList<A, B>, a: A): Maybe<B> =>
  xs.reduce<Maybe<B>>(
    (acc, t) => (a === fst(t) ? just(snd(t)) : acc),
    nothing(),
  )

type stringLengthAssoc = (
  assoc: AssocList<string, number>,
  s: string,
) => AssocList<string, number>
const stringLengthAssoc: stringLengthAssoc = (assoc = emptyAssoc(), s) =>
  insertAssoc(assoc, [s, s.length])

const zipAssoc = <A, B>(as: A[], bs: B[]): AssocList<A, B> =>
  as.reduce((acc, a, i) => insertAssoc(acc, [a, bs[i]]), emptyAssoc<A, B>())
