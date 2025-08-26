import { create } from 'zustand'
import { createSetterFn, type SetStateFn } from '../core/index'
import reactLogo from '../assets/react-logo.svg'

// Set up the Type interface (TS only)
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
		// Pass in a value directly to set to that exact value
		reset: () => setCount(0),
	}
})

// How to use the state inside a component
export function ReactExample() {
	// extract each piece of state from the Zustand store
	const { count, setCount, increment, reset } = useCounterStore()

	return (
		<div className="example-wrapper">
			<img src={reactLogo} height={25} width={25} />
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
			<button onClick={increment}>Increment</button>
			<button onClick={reset}>Reset</button>
		</div>
	)
}
