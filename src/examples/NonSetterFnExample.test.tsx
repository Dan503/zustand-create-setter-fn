import { cleanup } from '@testing-library/react'
import { beforeEach, describe } from 'vitest'
import { NonSetterFnExample } from './NonSetterFnExample'
import { testsFor } from './tests'

beforeEach(() => cleanup())

describe('NonSetterFnExample', () => {
	testsFor(<NonSetterFnExample />)
})
