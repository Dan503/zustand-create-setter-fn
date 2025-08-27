import { useEffect } from 'react'
import { initializeVanillaTsExample } from './VanillaTsExample'

export function VanillaTsExampleComponent() {
	useEffect(() => {
		initializeVanillaTsExample()
	}, [])

	return <div className="example-wrapper" id="vanilla-ts-example"></div>
}
