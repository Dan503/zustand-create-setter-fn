# 🐻 Zustand Create Setter Function 🐻

[![npm version](https://img.shields.io/npm/v/zustand-create-setter-fn)](https://www.npmjs.com/package/zustand-create-setter-fn)
[![npm downloads](https://img.shields.io/npm/dm/zustand-create-setter-fn)](https://www.npmjs.com/package/zustand-create-setter-fn)
[![license](https://img.shields.io/npm/l/zustand-create-setter-fn)](./LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/zustand-create-setter-fn)](https://bundlephobia.com/package/zustand-create-setter-fn)
[![install size](https://packagephobia.com/badge?p=zustand-create-setter-fn)](https://packagephobia.com/result?p=zustand-create-setter-fn)

A fully type safe utility for Zustand that allows you to easily update state using React style `setState` functions (framework agnostic, doesn't require React).

## [🌐 View the demo site](https://dan503.github.io/zustand-create-setter-fn/)

<p>
    <a href="https://github.com/Dan503/zustand-create-setter-fn">
        <img src="./src/assets/github-logo.svg" width="14" height="14" alt="" />
        <span> View on GitHub</span>
    </a>
</p>

<p>
    <a href="https://www.npmjs.com/package/zustand-create-setter-fn">
        <img src="./src/assets/npm-logo.svg" width="14" height="14" alt="" />
        <span> View on npm</span>
    </a>
</p>

## 📥 Install

<img src="./src/assets/npm-logo.svg" alt="install with npm" height="14" width="14"> `npm i zustand-create-setter-fn`

<img src="./src/assets/pnpm-logo.svg" alt="install with pnpm" height="14" width="14"> `pnpm add zustand-create-setter-fn`

<img src="./src/assets/yarn-logo.svg" alt="install with Yarn" height="14" width="14"> `yarn add zustand-create-setter-fn`

<img src="./src/assets/bun-logo.svg" alt="install with Bun" height="14" width="14"> `bun add zustand-create-setter-fn`

## 🤔 Why use this?

In short it turns this:

```ts
const useCounterStore = create<CounterStore>()((set) => {
   return {
      count: 0,

      // So much boilerplate!
      // You have to repeat this for every setter function in the state.
      setCount: (nextCount: SetStateFnParam<number>) => {
         set((prevState) => ({
            count:
               typeof nextCount === 'function'
                  ? nextCount(prevState.count)
                  : nextCount,
         }))
      },

      // This is cleaner than the above setCount example,
      // though it is still more verbose than using
      // increment: () => setCount(prev => prev + 1)
      increment: () => {
         set((prevState) => ({
            count: prevState.count + 1,
         }))
      },

      reset: () => {
         set(() => ({ count: 0 }))
      },
   }
})
```

Into this:

```ts
const useCounterStore = create<CounterStore>()((set) => {
   const setCount = createSetterFn(set, 'count') // ⬅️ createSetterFn used here

   return {
      count: 0,
      setCount,
      // Pass in a function to use the previous state as part of the new state
      increment: () => setCount((prevCount) => prevCount + 1),
      // Pass in a value directly to set the state to that exact value
      reset: () => setCount(0),
   }
})
```

## <img src="./src/assets/react-logo.svg" height="24" width="24"> Example usage in React

`createSetterFn` is framework agnostic. It does not need React in order to work. React is a popular framework though and the `createSetterFn` API is based on the React `useState` setter function, so I'll use React for this example.

```tsx
import { create } from 'zustand'
import { createSetterFn, type SetStateFn } from 'zustand-create-setter-fn'

// Set up the type interface (only necessary if using TypeScript)
interface CounterStore {
   count: number
   setCount: SetStateFn<number>
   reset: () => void
   increment: () => void
}

// Set up the Zustand store
const useCounterStore = create<CounterStore>()((set) => {
   const setCount = createSetterFn(set, 'count') // ⬅️ createSetterFn used here

   return {
      count: 0,
      setCount,
      // Pass in a function to use the previous state as part of the new state
      increment: () => setCount((prevCount) => prevCount + 1),
      // Pass in a value directly to set the state to that exact value
      reset: () => setCount(0),
   }
})

// How to use the state inside a component
export function ReactExample() {
   // extract each piece of state from the Zustand store
   const { count, setCount, increment, reset } = useCounterStore()

   return (
      <div className="example-wrapper">
         <label htmlFor="react-input">Count = </label>
         <input
            id="react-input"
            value={count}
            onChange={(e) => {
               const value = parseInt(e.target.value)
               if (isNaN(value)) return
               setCount(value)
            }}
         />
         <div className="button-wrapper">
            <button onClick={increment}>Increment</button>
            <button onClick={reset}>Reset</button>
         </div>
      </div>
   )
}
```

## 🚫 Same thing but without using `createSetterFn`

A demonstration of the amount of additional code needed to achieve the same functionality as the above example without using `createSetterFn`.

```tsx
import { create } from 'zustand'

// Setter types need to be manually defined
type SetStateFnParam<T> = T | ((prev: T) => T)
type SetStateFn<T> = (param: SetStateFnParam<T>) => void

interface CounterStore {
   count: number
   setCount: SetStateFn<number>
   increment: () => void
   reset: () => void
}

const useCounterStore = create<CounterStore>()((set) => {
   return {
      count: 0,

      // So much boilerplate!
      // You have to repeat this for every setter function in the state.
      setCount: (nextCount: SetStateFnParam<number>) => {
         set((prevState) => ({
            count:
               typeof nextCount === 'function'
                  ? nextCount(prevState.count)
                  : nextCount,
         }))
      },

      // This is cleaner than the above setCount example,
      // though it is still more verbose than using
      // increment: () => setCount(prev => prev + 1)
      increment: () => {
         set((prevState) => ({
            count: prevState.count + 1,
         }))
      },

      reset: () => {
         set(() => ({ count: 0 }))
      },
   }
})

export function NonSetterFnExample() {
   const { count, setCount, increment, reset } = useCounterStore()

   return (
      <div className="example-wrapper">
         <label htmlFor="react-input">Count = </label>
         <input
            id="react-input"
            value={count}
            onChange={(e) => {
               const value = parseInt(e.target.value)
               if (isNaN(value)) return
               setCount(value)
            }}
         />
         <div className="button-wrapper">
            <button onClick={increment}>Increment</button>
            <button onClick={reset}>Reset</button>
         </div>
      </div>
   )
}
```

## <img src="./src/assets/typescript-logo.svg" height="24" width="24" /> Vanilla TypeScript Example

A demonstration of how this utility can work even with no framework at all. Zustand is doing the majority of the heavy lifting on the state front.

```ts
import { createStore } from 'zustand'
import { createSetterFn, type SetStateFn } from 'zustand-create-setter-fn'

interface CounterStore {
   count: number
   setCount: SetStateFn<number>
   increment: () => void
   reset: () => void
}

const vanillaCounterStore = createStore<CounterStore>()((set) => {
   const setCount = createSetterFn(set, 'count') // ⬅️ createSetterFn() used here

   return {
      count: 0,
      setCount,
      // Even though this is vanilla JS, you can use setCount just like a React setState function
      increment: () => setCount((oldCount) => oldCount + 1),
      reset: () => setCount(0),
   }
})

export function initializeVanillaTsExample() {
   const container = document.getElementById('vanilla-ts-example')
   if (!container) {
      return
   }

   container.innerHTML = `
      <label>
         <span>Count =</span>
         <input type="text" />
      </label>
      <div class="button-wrapper">
         <button id="vanilla-ts-increment">Increment</button>
         <button id="vanilla-ts-reset">Reset</button>
      </div>
`

   const inputElem = container.querySelector<HTMLInputElement>('input')
   const incrementButton = container.querySelector<HTMLButtonElement>(
      '#vanilla-ts-increment',
   )
   const resetButton =
      container.querySelector<HTMLButtonElement>('#vanilla-ts-reset')

   if (!inputElem || !incrementButton || !resetButton) {
      return
   }

   const { getState } = vanillaCounterStore
   // updater functions can be retrieved once on initialization from the state like this
   const { increment, reset, setCount } = getState()

   updateInput()

   inputElem.oninput = (e) => {
      const elem = e.target as HTMLInputElement
      const value = parseInt(elem.value)
      if (isNaN(value)) {
         return
      }
      setCount(value)
      updateInput()
   }

   incrementButton.onclick = () => {
      increment()
      updateInput()
   }
   resetButton.onclick = () => {
      reset()
      updateInput()
   }

   /** Vanilla JS is not reactive so we have to update the input manually */
   function updateInput() {
      if (!inputElem) return
      // For state values, `getState()` needs to be called each time they are used
      // This ensures that the value is always in sync with the state
      inputElem.value = getState().count.toString()
   }
}
```
