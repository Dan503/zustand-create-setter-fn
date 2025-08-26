import './App.css'
import { useEffect } from 'react'
import { CodeHighlighter } from './components/CodeHighlighter'
import { initializeVanillaExample } from './components/VanillaTsExample'
import { default as VanillaExampleSource } from './components/VanillaTsExample.ts?raw'
import { default as NonSetterFnExampleSource } from './components/NonSetterFnExample.tsx?raw'
import { ReactExample } from './components/ReactExample'
import { default as ReactExampleSource } from './components/ReactExample.tsx?raw'
import pkg from '../package.json'

function replaceImport(fileContent: string) {
	const pkgName = `${pkg.name}`
	return fileContent
		.replace('../core/index', pkgName)
		.replace('../core', pkgName)
}

function App() {
	useEffect(() => {
		initializeVanillaExample()
	}, [])

	return (
		<>
			<h1>
				🐻 Zustand <code>createSetterFn</code> 🐻
			</h1>
			<ReactExample />
			<CodeHighlighter>
				{replaceImport(ReactExampleSource)}
			</CodeHighlighter>

			<details>
				<summary>
					Creating the same thing without <code>createSetterFn</code>
				</summary>

				<CodeHighlighter>
					{replaceImport(NonSetterFnExampleSource)}
				</CodeHighlighter>
			</details>

			<div className="card" id="vanilla-ts-example"></div>

			<details>
				<summary>Vanilla TS code example</summary>
				<CodeHighlighter>
					{replaceImport(VanillaExampleSource)}
				</CodeHighlighter>
			</details>
		</>
	)
}

export default App
