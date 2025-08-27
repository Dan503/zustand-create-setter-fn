import { describe } from 'vitest'
import { testsFor } from './tests'
import { VanillaTsExampleComponent } from './VanillaTsExampleComponent'

describe('VanillaTsExample', () => {
	testsFor(<VanillaTsExampleComponent />)
})
