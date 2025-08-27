import { StoreApi } from 'zustand';

/** The parameter of a setState function */
type SetStateFnParam<T> = T | ((oldState: T) => T);
/** This type is compatible with React setState functions */
type SetStateFn<T> = (newState: SetStateFnParam<T>) => void;
/**
 * Creates the `setState` function for a given piece of state.
 *
 * ```ts
 *  import { create } 'zustand';
 *  import { createSetterFn, SetStateFn } from 'zustand-create-setter-fn';
 *
 *  interface CounterStore {
 *    count: number
 *    setCount: SetStateFn<number>
 *    increment: () => void
 * }
 *
 * const useCounterStore = create<CounterStore>()((set) => {
 *   // Use this function like you would any React setState function
 *   const setCount = createSetterFn(set, 'count')
 *
 *   return {
 *     count: 0,
 *     setCount,
 *     increment: () => setCount(oldCount => oldCount + 1),
 *   }
 * })
 * ```
 */
declare function createSetterFn<State extends Record<string, any>, Key extends keyof State>(set: StoreApi<State>['setState'], key: Key): SetStateFn<State[Key]>;

export { type SetStateFn, type SetStateFnParam, createSetterFn };
