import './App.css'
import { createSetterFn, type SetStateFn } from './core'
import { create } from 'zustand'

interface CounterStore {
	count: number
	setCount: SetStateFn<number>
	increment: () => void
}

const useCounterStore = create<CounterStore>()((set) => {
	// Use this function like you would any React setState function
	const setCount = createSetterFn(set, 'count')
	return {
		count: 0,
		setCount,
		increment: () => setCount((oldCount) => oldCount + 1),
	}
})

function App() {
	const { count, increment, setCount } = useCounterStore()

	return (
		<>
			<h1>
				Zustand <code>createSetterFn</code>
			</h1>
			<div
				className="card"
				style={{ display: 'flex', gap: '1em', alignItems: 'center' }}
			>
				<label style={{ display: 'flex', gap: '1em' }}>
					<span>The count is</span>
					<input
						type="text"
						value={count}
						onChange={(e) => {
							const value = parseInt(e.target.value)
							if (isNaN(value)) {
								return
							}
							setCount(value)
						}}
					/>
				</label>
				<button onClick={increment}>increment</button>
			</div>
		</>
	)
}

export default App
