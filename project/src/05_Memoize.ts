import { emptyM, lookupM, insertM } from "../lib/Map"

const memoize = <A, B>(f: (...a: A[]) => B) => {
  let map = emptyM<B>()
  return (...a: A[]) => {
    const stringifiedA = JSON.stringify(a)
    const l = lookupM<B>(map, stringifiedA)
    switch (l.type) {
      case "nothing":
        const result = f(...a)
        map = insertM(map, stringifiedA, result)
        return result
      case "just":
        return l.just
    }
  }
}

