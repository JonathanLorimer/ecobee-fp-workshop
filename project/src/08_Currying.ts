import { map, compose } from "./07_HigherOrderFunctions"

const arrayNum = [1, 2, 3, 4, 5]
const arrayString = ["hello", "world", "how", "are", "you"]

const add = (x: number) => (y: number) => x + y
const mult = (x: number) => (y: number) => x * y
const length = (x: string): number => x.length
map<number, number>(arrayNum, add(2))
map<number, number>(arrayNum, mult(2))
map<string, number>(arrayString, compose(mult(2), length))
