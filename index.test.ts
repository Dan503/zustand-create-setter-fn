import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { create, type UseBoundStore } from 'zustand'
import { createStore, type StoreApi } from 'zustand/vanilla'
import { createSetterFn, type SetStateFn } from '.'

interface CounterStore {
	count: number
	setCount: SetStateFn<number>
	increment: () => void
}

describe('createSetterFn', () => {
	describe('vanilla JS compatibility', () => {
		const store = createStore<CounterStore>()((set) => {
			// Use this function like you would any React setState function
			const setCount = createSetterFn(set, 'count')

			return {
				count: 0,
				setCount,
				increment: () => setCount((oldCount) => oldCount + 1),
			}
		})

		it('can get the count value', () => {
			expect(store.getState().count).toBe(0)
		})
		it('can increment the value', () => {
			const { increment } = store.getState()
			increment()
			expect(store.getState().count).toBe(1)
			increment()
			expect(store.getState().count).toBe(2)
		})
		it('can force set the value', () => {
			const { setCount } = store.getState()
			setCount(25)
			expect(store.getState().count).toBe(25)
			setCount((prev) => prev - 1)
			expect(store.getState().count).toBe(24)
		})
	})

	describe('React hook variant', () => {
		let useCounterStore: UseBoundStore<StoreApi<CounterStore>>

		beforeEach(() => {
			useCounterStore = create<CounterStore>()((set) => {
				const setCount = createSetterFn(set, 'count')
				return {
					count: 0,
					setCount,
					increment: () => setCount((oldCount) => oldCount + 1),
				}
			})
		})

		it('can get the count value', () => {
			const { result } = renderHook(() => useCounterStore())
			expect(result.current.count).toBe(0)
		})

		it('can increment the value', () => {
			const { result } = renderHook(() => useCounterStore())
			act(() => result.current.increment())
			expect(result.current.count).toBe(1)
			act(() => result.current.increment())
			expect(result.current.count).toBe(2)
		})

		it('can force set the value', () => {
			const { result } = renderHook(() => useCounterStore())
			act(() => result.current.setCount(25))
			expect(result.current.count).toBe(25)
			act(() => result.current.setCount((prev) => prev - 1))
			expect(result.current.count).toBe(24)
		})
	})
})
