---
author: "Jonathan Lorimer"
title: "λ Hardcore Functional Programming in TypeScript λ"
patat:
    wrap: true
    incrementalLists: true
    theme:
        header: [bold, dullYellow]
        bulletList: [dullWhite, dullWhite]
        emph: [bold]
        strong: [bold]
        code: [dullRed, onDullBlack, bold]
        codeBlock: [dullWhite, onDullBlack ]
        syntaxHighlighting:
          string: [dullGreen]
          char: [dullGreen]
          specialChar: [dullCyan]
          verbatimString: [dullGreen]
---
# Welcome Web-Chapter

## Introduction and Motivation
- Opinionated approach to functional programming
- Emphasis on types
- FP in the small vs in the large
    - Immutability and Purity help us reason locally
    - Composition helps us build up complex programs from simple ones
    - First class functions help us achieve generality (through HOF and currying)
    - Types help us constrain the possible states of our program, and give us visibility into our inputs and outputs; they help make sure our programs compose the way we intend

## Structure
- Modules: Organized set of material that should have a large learning outcome
- Evolutions: Small exercises or lectures that should build on eachother
- 5 modules:
    - TypeScript Syntax
    - Type Theory
    - Functional Programming in Concept
    - Functional Programming Patterns
    - Functional Abstractions


<!-- TypeScript Syntax -->
# TypeScript Syntax

## Type Aliases

- Useful way to associate a type with a name
- Embed domain semantics into your types
```typescript
type ThermostatName = string
type Occupancy = boolean
type FarenheitTemp = number
type CelsiusTemp = number
```

- Simplify type signatures
```typescript
const curry =  <A, B, C>(f: (a: A, b: B) => C)
            => (a: A): ((b: B) => C)
            => (b: B,): C
            => f(a, b)

type curry2 = <A, B, C>(f: (a: A, b: B) => C)
            => (a: A)
            => (b: B)
            => C
const curry2: curry2 = (f) => (a) => (b) => f(a, b)
```

## Interfaces

```typescript
interface Thermostat {
  occupancy: boolean
  temperature: number
  useCelsius: boolean
  sensors: Sensor[]
  name: string
}
```

```typescript
const thermostat = (
  occupancy: boolean,
  temperature: number,
  useCelsius: boolean,
  sensors: Sensor[],
  name: string
): Thermostat => ({
  occupancy,
  temperature,
  useCelsius,
  sensors,
  name
})
```

## Re-usability

- Reuse through extending
```typescript
interface StandardSettings {
  heat: boolean
  cool: boolean
  climates: Climate[]
}

interface VoiceSettings
  extends StandardSettings {
    alexa: boolean
    googleHome: boolean
    homeKit: boolean
}
```

- Say all of a sudden we want to parameterize our types...
- Generics
```typescript
interface Thermostat<T> {
  occupancy: boolean
  temperature: number
  useCelsius: boolean
  sensors: Sensor[]
  name: string
  settings: T
}

type Vulcan = Thermostat<VoiceSettings>

type Ecobee3L = Thermostat<StandardSettings>
```

## Generic Functions

```typescript
const thermostat = <T>(
  occupancy: boolean,
  temperature: number,
  useCelsius: boolean,
  sensors: Sensor[],
  name: string
  settings: T
): Person => ({
  occupancy,
  temperature,
  useCelsius,
  sensors,
  name
})
```
# Exercise: 1_Generics.ts

# Type Theory

## What is an Algebraic Data Type
- Sum Type
- Product Type
- Pattern Matching

## Quick Refresher on Complexity
- Cardinality vs Ordinality

- Ordinal definition of numbers
```
colour channels :: [red, green, blue]
3 === blue
2 === green
1 === red
```
- Cardinal definition of numbers
```
Set of possible moves :: {rock, paper, scissors}
3 === number of moves
2 === number of non-winning moves
1 === number of winning moves
```
# Sum Types

## Enum Type (Typescript)

```typescript
type Squads = "SmartBuildings"
            | "Dot Com"
            | "Admin Portal"
            | "Zeus / Chronos"
            | "Subscriptions"
            | "Bee Hive"

type Nums = 1 | 2 | 3
type MyBool = true | false
```
- Typescript does not give you an algebraic sum type out of the box
- For that we need a tagged/discriminated union

### Logic and Math
- Sum types are equivalent to logical disjunction `∨ or ||`
- Sum types are equivalent to addition when it comes to cardinality

## Discriminated Union
- Enum type with a `tag`
- tag allows for pattern matching

- Which field is the tag?
```typescript
interface SmartBuildings {
  name: "smartbuildings
  techstack: ProgrammingLanguage[]
  productManagers: PM[]
}

interface BeeHive {
  name: "beehive"
  connectedProducts: Products[]
  devRel: string
}

interface DotCom {
  name: "dotcom"
  gatsbyPages: Pages[]
  wordPressPages: Pages[]
  consultants: string
}
```

## Discriminated Union Cont.
- What does the tag do?
```typescript
type Squad = SmartBuildings
            | BeeHive
            | DotCom

type StakeHolder = string

const getStakeholder = (squad: Squad): StakeHolder => {
  switch (squad.name) {
  case "smartbuildings":
    return squad.productManagers.join(", and ")
  case "beehive":
    return squad.devRel
  case "dotcom":
    return `our friends over at ${squad.consultants}`
  }
}
```
- Where have we seen this before...

## Redux!!!

```javascript
//reducer.js
export default = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    default:
      return state
  }
}
```
# Exercise: 2_Maybe.ts

# Product Type

## What the hell is a Cartesian Product

- What is a Cartesian Product?

### How many squares on a Chess board?
```
       8 /__////__////__////__////
      7 ////__////__////__////__/
     6 /__////__////__////__////
    5 ////__////__////__////__/
   4 /__////__////__////__////
  3 ////__////__////__////__/
 2 /__////__////__////__////
1 ////__////__////__////__/
   a  b  c  d  e  f  g  h
```

- That's right, 64
- Each square is a Cartesian Product e.g. (a, 1) or (d, 4)
- We know that the set of Cartesian Products is 64 because we know `8 * 8`

## Product Type (TypeScript)
```typescript
interface Pair<T,U> {
  first: T;
  second: U;
}
const pair = <T,U>(first: T, second: U): Pair<T,U> => ({first, second})
```
- Can be arbitrarily large
- Association of values, with discrete types (they can be heterogenous)
- We can pattern match on these as well!

```typescript
const fst = ({first}) => first
const snd = ({second}) => second
```

- This is less interesting than discriminated unions because you are guaranteed to have both members

### Logic && Math
- Product types are equivalent to logical conjunction `∧ or &&`
- Product types are equivalent to multiplication when it comes to cardinality

# Exercise: 3_Products.ts

## What are they good for? How do we use them?
- Sum type represents possibility
    - injects from an individual type to the generalized sum type
    - Less work when constructing, you have to know less when carrying around a sum type
    - More work when unpacking, you have to handle more cases when you want to handle actual values
```
        a           b
         \         /
          \       /
           \     /
            a | b
```

## What are they good for? (continued)
- Product type carries additional data
    - projects from the product type to an individual type
    - More work when constructing, you need to know both types at all times
    - Less work when unpacking, you can just take whichever type you need
```
            (a,b)
            /   \
           /     \
          /       \
         a         b
```

# Representing Complex Data with ADTS

## Linked List
```haskell
linkedList = 1 : 2 : 3 : 4 : 5 : []
```

- Let's focus on the components
```haskell
    1         :          2
    ^         ^          ^
  datum   cons/spine    datum
```
```haskell
    5         :         [ ]
    ^         ^          ^
  datum   cons/spine    nil
```

- Let's formalize that in logic
```
datum : list | datum : nil
```
## Linked List Cont

```haskell
linkedList = 1 : 2 : 3 : 4 : 5 : []

datum : list | datum : nil
```
- If we squint our eyes we can see that `:` is a product type, we will call it `cons`
```
cons { datum , list } | cons { datum , nil }
```
- We know that `A & B | A & C` is equivalent to `A & (B | C)`

```
cons { datum , list | nil }
```
- Let's put that in code

# Exercise: 4_LinkedList.ts

# Functional Programming in Concept

# Pure Functions

## The Basics
- No side-effects
    - No mutating external state
    - No printing to the console
    - No external requests
- Referential Transparency
    - Return value is the same for the same inputs
    - Put another way: two inputs can have the same output, but the same input cannot have two outputs
    - The computational analogue of a mathematical function


# What is the complexity of the function type?

## Exponentiation!

```typescript
type Triple = "A" | "B" | "C"
type triple = (bool: boolean) => Triple
// Set 1 ------------------------------
const triple = True => "A"
const triple = False => "A"
// Set 2 ------------------------------
const triple = True => "A"
const triple = False => "B"
// Set 3 ------------------------------
const triple = True => "A"
const triple = False => "C"
// Set 4 ------------------------------
const triple = True => "B"
const triple = False => "A"
// Set 5 ------------------------------
const triple = True => "B"
const triple = False => "B"
// Set 6 ------------------------------
const triple = True => "B"
const triple = False => "C"
// Set 7 ------------------------------
const triple = True => "C"
const triple = False => "A"
// Set 8 ------------------------------
const triple = True => "C"
const triple = False => "B"
// Set 9 ------------------------------
const triple = True => "C"
const triple = False => "C"

boolean (2) => Triple (3)
3^2
```

## Functions are just Hashtables
- Because of referential transparency, functions are just mappings from inputs to outputs
- This is basically a hashtable
- This makes memoization straightforward for pure functions

# Exercise: 5_Memoize.ts

## Composition

- Mathematical notation
```
f ∘ g
```
- I call it `f` after `g`
- Compose is actually a higher order function

```typescript
type compose = <A, B, C>(f: (b: B) => C, g: (a: A) => B) => ((a: A) => C)
const compose: compose = (f, g) => (a) => f(g(a))
```
- Notice that it takes 2 unary functions (1 argument) and combines them into a larger unary function
- For anyone familiar with formal logic: Hypothetical Syllogism
```
if A then B
if B then C
---
if A then C
```
- Why is composition right to left?
- Think in terms of function applications instead of data passing through

```
X - f g h i j k <- data

✓ - f ( g ( h ( i ( j ( k ( data ) ) ) ) ) )
      ->  ->  ->  ->  ->  ->
```

# Exercise: 6_Compose.ts

# Functional Programming Patterns

## First Class Functions

- Minimum criteria for functional programming is first class functions

```typescript
() => {}
```

- This allows us to:
    - Pass functions as arguments
    - Accept functions as arguments
    - return functions as results

## Callbacks and Higher Order Functions
```typescript
[1, 2, 3, 4, 5].map(    f    )
                 ^      ^
                HOF  callback
```

- This is a very common pattern in functional programming
- This general type signature should become familiar over the next couple of slides

```typescript
type HOF = <A, B>(f: (a: A) => B, a: A) => B
```

# Exercise: 7_HigherOrderFunctions.ts

## Arity

- What is arity?
- It is the number of parameters a function has

```typescript
const unary      = (a) => a
const binary     = (a, b) => a
const ternary    = (a, b, c) => a
const quatrenary = (a, b, c, d) => d

const ternary2 = (a, b, c) => a ? b : c
```

## Currying

- What is currying?
- It is a trick we use to make all of our functions unary
- What is the purpose? Better composability

```typescript
const unary      = (a) => a
const binary     = (a) => (b) => a
const ternary    = (a) => (b) => (c) => a
const quatrenary = (a) => (b) => (c) => (d) => a
```

- This means slightly different call site syntax

```typescript

quatrenary("a")                 // [Function]
quatrenary("a")("b")            // [Function]
quatrenary("a")("b")("c")       // [Function]
quatrenary("a")("b")("c")("d")  // "a"
```

- This is extremely useful for our higher order functions such as `compose` and `map`

```typescript
[1, 2, 3, 4, 5].map(quatrenary("a")("b")("c")) // ["a", "a", "a", "a" , "a"]
[1, 2, 3, 4, 5].map(quatrenary("a")("b"))
// [[Function], [Function], [Function], [Function] , [Function]]
```

## Partial Application

- Partial application is the process of applying curried functions down
- You can think of this as binding values to the names of function arguments

```typescript

quatrenary("a")                 // binding "a" to the variable a
quatrenary("a")("b")            // binding "b" to the variable b
quatrenary("a")("b")("c")       // binding "c" to the variable c
quatrenary("a")("b")("c")("d")  // calling the final function with "d"
```

- Because of partial application we should be mindful of the order our arguments come in

```typescript
const map = (array) => (fn) => array.map(fn)
const map = (fn) => (array) => array.map(fn)

const lookup = (obj) => (key) => obj[key]
const lookup = (key) => (obj) => obj[key]

const insert = (obj) => (key) => (value) => {...obj, [key]: value}
const insert = (key) => (value) => (obj) => {...obj, [key]: value}
const insert = (value) => (key) => (obj) => {...obj, [key]: value}

// Utility function
const flip = (fn) => (a) => (b) => fn(b)(a)

// Same but using a lambda
(fn) => (array) => map(array)(fn)
```
# Exercise: 8_Currying

# Reading Types

## Parametricity

- The less you know about a functions types the more you know about its implementation

```typescript
type E1 = <A>(a: A) => A
```
```haskell
E1 :: a -> a
```
- Identity

```typescript
type E2 = <A, B>(a: A) => (b: B) => A
```
```haskell
E2 :: a -> b -> a
```
- Constant

```typescript
type E3 = <A, B, C>(f: (b: B) => C) => (g: (a: A) => C) => C
```
```haskell
E3 :: (b -> c) -> (a -> b) -> (a -> c)
```
- Composition

## Parametricity Continued

```typescript
type E4 = <A, B>(f: (a: A) => B) => (a: A) => B
```
```haskell
E4 :: (a -> b) -> a -> b
```
- Apply

```typescript
type E5 = <A, B>(f: (a: A) => B) => (a: A[]) => B[]
```
```haskell
E5 :: (a -> b) -> F a -> F b
```
- Map

```typescript
type E6 = <A, B>(f: Array<(a: A) => B>) => (a: A[]) => B[]
```
```haskell
E6 :: F (a -> b) -> F a -> F b
```
- Applicative

# Recursion

## Basics
2 Components
- Base case
- Recursive case

- starting structure

```typescript
const iterate = (xs) => ???
```

- first step in our list

```typescript
const iterate = ([x, ...xs]) => ???
```

- base case

```typescript
const iterate = ([x, ...xs]) => x === undefined ? null : ???
```

- recursive case

```typescript
const iterate = ([x, ...xs]) => x === undefined ? null : iterate(xs)
```

# Exercise: 9_Recursion.ts

# Useful Abstractions

## Canonical Sum Type

```typescript
interface Nothing {
  nothing: null
  type: "nothing"
}

type nothing = () => Nothing
const nothing: nothing = () => ({ nothing: null, type: "nothing" })

interface Just<A> {
  just: A
  type: "just"
}
type just = <A>(a: A) => Just<A>
const just: just = (a) => ({ just: a, type: "just" })

type Maybe<A> = Just<A> | Nothing
```
- Abstraction over null checks
- What if we want better error handling?

# Exercise: 10_Either.ts

## Canonical Product Type
```typescript
export interface Tuple<A, B> {
  [0]: A
  [1]: B
  [Symbol.iterator](): any
}

type tuple = <A, B>(a: A, b: B) => Tuple<A, B>
const tuple: tuple = (a, b) => [a, b]
```

- Abstraction over association
- A more common example is a record type

```typescript
type ThermostatName = string
type Occupancy = boolean
type FarenheitTemp = number
type CelsiusTemp = number

interface Thermostat {
  occupancy: Occupancy
  temperature: FarenheitTemp | CelsiusTemp
  useCelsius: boolean
  sensors: Sensor[]
  name: ThermostatName
}
```
- An interface and a constructor (or a Class) is really the best representation of the canonical product type

## Functor

```typescript
interface Functor<A> {
  map: <A, B>(f: (a: A) => B) => (functor: Functor<A>) => Functor<B>
}


interface Functor<A> {
  map: <A, B>(f: (a: A) => B) => Functor<B>
}

// Laws
someFunctor.map(id) === someFunctor
someFunctor.map(compose(f, g)) === someFunctor.map(g).map(f)
```


## Monoid

```typescript
interface Monoid<A> {
  empty: A
  append: (a: A) => (b: A) => A
}

interface Monoid<A> {
  empty: A
  append: (a: this) => A
}

append("hello ","world")  // "hello world"
append([1, 2, 3], [4, 5]) // [1, 2, 3, 4, 5]

// Laws
append("hello", empty) === id("hello)
append(append("hello ", "world"), " hows it going") ===
append("hello ", append("world", " hows it going")
```

## Some Libraries to Consider


  - *fp-ts:* for category theory and haskell (https://github.com/gcanti/fp-ts)
  - *io-ts:* for runtime types (https://github.com/gcanti/io-ts)
