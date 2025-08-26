import { createStore } from 'zustand'
import { createSetterFn } from '../core'

const vanillaCounterStore = createStore()((set) => {
	const setCount = createSetterFn(set, 'count') // ⬅️ createSetterFn() used here

	return {
		count: 0,
		setCount,
		// Even though this is vanilla JS, you can use setCount just like a React setState function
		increment: () => setCount((oldCount) => oldCount + 1),
		reset: () => setCount(0),
	}
})

export function initializeVanillaJsExample() {
	const container = document.getElementById('vanilla-js-example')
	if (!container) {
		return
	}

	container.innerHTML = `
		<label class="card__label">
			<span>Count =</span>
			<input type="text" />
		</label>
		<div class="button-wrapper">
			<button id="vanilla-js-increment">Increment</button>
			<button id="vanilla-js-reset">Reset</button>
		</div>
`

	const inputElem = container.querySelector('input')
	const incrementButton = container.querySelector('#vanilla-js-increment')
	const resetButton = container.querySelector('#vanilla-js-reset')

	if (!inputElem || !incrementButton || !resetButton) {
		return
	}

	const { getState } = vanillaCounterStore
	// updater functions can be retrieved once on initialization from the state like this
	const { increment, reset, setCount } = getState()

	updateInput()

	inputElem.oninput = (e) => {
		const elem = e.target
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
