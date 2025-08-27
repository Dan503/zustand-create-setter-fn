import { describe } from 'vitest'
import { testsFor } from './tests'
import { VanillaJsExampleComponent } from './VanillaJsExampleComponent'
import React from 'react'

describe('VanillaJsExample', () => {
	testsFor(<VanillaJsExampleComponent />)
})
