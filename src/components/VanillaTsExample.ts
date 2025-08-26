import { createStore } from 'zustand'
import { createSetterFn, type SetStateFn } from '../core'

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

export function initializeVanillaExample() {
	const container = document.getElementById('vanilla-ts-example')
	if (!container) {
		return
	}

	container.innerHTML = `
		<label class="card__label">
			<img src="/typescript-logo.svg" alt="" height="25" width="25" />
			<span>The vanilla TS count is</span>
			<input type="text" />
		</label>
		<button id="vanilla-increment">Increment</button>
		<button id="vanilla-reset">Reset</button>
`

	const inputElem = container.querySelector<HTMLInputElement>('input')
	const incrementButton =
		container.querySelector<HTMLButtonElement>('#vanilla-increment')
	const resetButton =
		container.querySelector<HTMLButtonElement>('#vanilla-reset')

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
		//	This ensures that the
		inputElem.value = getState().count.toString()
	}
}
