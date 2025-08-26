import './App.css'
import { createSetterFn, type SetStateFn } from './core'
import { create, createStore } from 'zustand'
import reactLogo from './assets/react-logo.svg'
import jsLogo from './assets/javascript-logo.svg'
import { useEffect } from 'react'

interface CounterStore {
	count: number
	setCount: SetStateFn<number>
	increment: () => void
}

const useCounterStore = create<CounterStore>()((set) => {
	// Use this function like you would any regular React setState function
	const setCount = createSetterFn(set, 'count')
	return {
		count: 0,
		setCount,
		increment: () => setCount((oldCount) => oldCount + 1),
	}
})

const vanillaCounterStore = createStore<CounterStore>()((set) => {
	// Even when using vanilla JS, you can still use this function like you would any React setState function
	const setCount = createSetterFn(set, 'count')
	return {
		count: 0,
		setCount,
		increment: () => setCount((oldCount) => oldCount + 1),
	}
})

function App() {
	const { count, increment, setCount } = useCounterStore()
	const { getState } = vanillaCounterStore

	// Just to prove that setCount is not triggering rerenders
	useEffect(() => {
		console.log('setCount in dependency array triggered')
	}, [setCount])

	return (
		<>
			<h1>
				🐻 Zustand <code>createSetterFn</code> 🐻
			</h1>
			<div className="card">
				<label style={{ display: 'flex', gap: '1em' }}>
					<img src={reactLogo} height={25} width={25} />
					<span>The React count is</span>
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

			<div className="card">
				<label style={{ display: 'flex', gap: '1em' }}>
					<img src={jsLogo} height={25} width={25} />
					<span>The vanilla JS count is</span>
					<input
						type="text"
						value={getState().count}
						onChange={(e) => {
							const value = parseInt(e.target.value)
							if (isNaN(value)) {
								return
							}
							getState().setCount(value)
						}}
					/>
				</label>
				<button onClick={getState().increment}>increment</button>
			</div>
		</>
	)
}

export default App
