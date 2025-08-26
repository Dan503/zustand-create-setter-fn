import './App.css'
import { useEffect } from 'react'
import { CodeHighlighter } from './components/CodeHighlighter'
import { initializeVanillaTsExample } from './examples/VanillaTsExample'
import { initializeVanillaJsExample } from './examples/VanillaJsExample.js'
import VanillaExampleSource from './examples/VanillaTsExample.ts?raw'
import VanillaJSExampleSource from './examples/VanillaJsExample.js?raw'
import NonSetterFnExampleSource from './examples/NonSetterFnExample.tsx?raw'
import ReactExampleSource from './examples/ReactExample.tsx?raw'
import { ReactExample } from './examples/ReactExample.js'
import pkg from '../package.json'
import { NonSetterFnExample } from './examples/NonSetterFnExample.js'
import reactLogo from './assets/react-logo.svg'
import javascriptLogo from './assets/javascript-logo.svg'
import typescriptLogo from './assets/typescript-logo.svg'
import githubLogo from './assets/github-logo.svg'

function replaceImport(fileContent: string) {
	const pkgName = `${pkg.name}`
	return fileContent
		.replace('../core/index', pkgName)
		.replace('../core', pkgName)
}

function App() {
	useEffect(() => {
		initializeVanillaTsExample()
		initializeVanillaJsExample()
	}, [])

	return (
		<div className="outerSiteContainer">
			<div className="intro">
				<h1>
					🐻 Zustand <code>createSetterFn</code> 🐻
				</h1>
				<p style={{ fontSize: '2em' }}>
					<code>npm i zustand-create-setter-fn</code>
				</p>
				<p>
					<a href="https://www.npmjs.com/package/zustand-create-setter-fn">
						<code>createSetterFn</code>
					</a>{' '}
					is a fully type-safe small utility for{' '}
					<a href="https://zustand.docs.pmnd.rs/">Zustand</a> that
					greatly simplifies the code necessary for updating a Zustand
					store.
				</p>
			</div>

			<section>
				<h2>
					<img
						src={reactLogo}
						height={25}
						width={25}
						alt="React example"
					/>{' '}
					React example
				</h2>
				<ReactExample />
				<CodeHighlighter>
					{replaceImport(ReactExampleSource)}
				</CodeHighlighter>
			</section>

			<section>
				<h2>
					🚫 React example but without <code>createSetterFn</code>
				</h2>

				<NonSetterFnExample />

				<details>
					<summary>
						View the no <code>createSetterFn</code> code
					</summary>

					<CodeHighlighter>
						{replaceImport(NonSetterFnExampleSource)}
					</CodeHighlighter>
				</details>
			</section>

			<section>
				<h2>
					<img src={typescriptLogo} height={25} width={25} alt="" />{' '}
					Vanilla Typescript example
				</h2>

				<div className="example-wrapper" id="vanilla-ts-example"></div>

				<details>
					<summary>Vanilla TypeScript code</summary>
					<CodeHighlighter>
						{replaceImport(VanillaExampleSource)}
					</CodeHighlighter>
				</details>
			</section>

			<section>
				<h2>
					<img src={javascriptLogo} height={25} width={25} alt="" />{' '}
					Vanilla JavaScript example
				</h2>
				<div className="example-wrapper" id="vanilla-js-example"></div>

				<details>
					<summary>Vanilla JavaScript code</summary>
					<CodeHighlighter>
						{replaceImport(VanillaJSExampleSource)}
					</CodeHighlighter>
				</details>
			</section>
			<p>
				<a href="https://github.com/Dan503/zustand-create-setter-fn">
					<img
						src={githubLogo}
						height={20}
						width={20}
						alt=""
						style={{
							background: '#fff',
							borderRadius: '50%',
							padding: '1px',
							transform: 'translateY(4px)',
							marginRight: 3,
						}}
					/>{' '}
					View on GitHub
				</a>
			</p>
		</div>
	)
}

export default App
