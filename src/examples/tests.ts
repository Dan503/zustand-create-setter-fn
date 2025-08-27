import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'
import { beforeEach, expect, test } from 'vitest'

export function testsFor(component: ReactElement) {
	async function setup() {
		render(component)
		const user = userEvent.setup()
		const inputElem = screen.getByRole<HTMLInputElement>('textbox')
		const incrementBtn = screen.getByRole<HTMLButtonElement>('button', {
			name: /increment/i,
		})
		const resetBtn = screen.getByRole<HTMLButtonElement>('button', {
			name: /reset/i,
		})

		// Need to reset the state as part of the set up
		await userEvent.click(resetBtn)

		return { user, inputElem, incrementBtn, resetBtn }
	}

	beforeEach(() => cleanup())

	test('starts at count 0', async () => {
		const { inputElem } = await setup()
		expect(inputElem.value).toBe('0')
	})
	test('incrementing increases the value', async () => {
		const { inputElem, incrementBtn } = await setup()

		await userEvent.click(incrementBtn)
		expect(inputElem.value).toBe('1')

		await userEvent.click(incrementBtn)
		expect(inputElem.value).toBe('2')
	})

	test('can reset the value', async () => {
		const { inputElem, incrementBtn, resetBtn } = await setup()

		await userEvent.click(incrementBtn)
		expect(inputElem.value).toBe('1')

		await userEvent.click(resetBtn)
		expect(inputElem.value).toBe('0')
	})

	test('can update the value', async () => {
		const { inputElem } = await setup()

		await userEvent.type(inputElem, '32')
		expect(inputElem.value).toBe('32')
	})

	test('will increment typed value', async () => {
		const { inputElem, incrementBtn } = await setup()

		await userEvent.type(inputElem, '32')
		expect(inputElem.value).toBe('32')

		await userEvent.click(incrementBtn)
		expect(inputElem.value).toBe('33')
	})

	test('will reset the typed value', async () => {
		const { inputElem, resetBtn } = await setup()

		await userEvent.type(inputElem, '32')
		expect(inputElem.value).toBe('32')

		await userEvent.click(resetBtn)
		expect(inputElem.value).toBe('0')
	})
}
