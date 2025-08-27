import { useEffect } from 'react'
import { initializeVanillaJsExample } from './VanillaJsExample'
import React from 'react'

export function VanillaJsExampleComponent() {
	useEffect(() => {
		initializeVanillaJsExample()
	}, [])

	return <div className="example-wrapper" id="vanilla-js-example"></div>
}
