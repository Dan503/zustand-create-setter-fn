import { describe } from 'vitest'
import { ReactExample } from './ReactExample'
import { testsFor } from './tests'

describe('ReactExample', () => {
	testsFor(<ReactExample />)
})
