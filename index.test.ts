import { describe, it } from 'vitest'
import { createSetterFn, type SetStateFn } from '.'
import { createStore } from 'zustand/vanilla'
import { expect } from 'vitest'

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
})
