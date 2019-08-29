import { Maybe, just, nothing } from "../src/02_Maybe"
export interface Map<V> {
  [k: string]: V
}
export const emptyM = <V>(): Map<V> => ({})
export const insertM = <V>(map: Map<V>, k: string, v: V): Map<V> => ({
  ...map,
  k: v,
})
export const lookupM = <V>(map: Map<V>, k: string): Maybe<V> =>
  map[k] ? just(map[k]) : nothing()
