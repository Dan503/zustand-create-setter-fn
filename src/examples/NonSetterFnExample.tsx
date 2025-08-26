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
