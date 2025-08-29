import './App.css'
import { CodeHighlighter } from './components/CodeHighlighter'
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
import npmLogo from './assets/npm-logo.svg'
import { VanillaTsExampleComponent } from './examples/VanillaTsExampleComponent.js'
import { VanillaJsExampleComponent } from './examples/VanillaJsExampleComponent.jsx'

function replaceImport(fileContent: string) {
	const pkgName = `${pkg.name}`
	return fileContent
		.replace('../core/index', pkgName)
		.replace('../core', pkgName)
}

function App() {
	return (
		<div className="outerSiteContainer">
			<div className="intro">
				<h1
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '0.2em',
					}}
				>
					🐻 <span>Zustand Create Setter Function</span> 🐻
				</h1>
				<p style={{ fontSize: '2em' }}>
					<code>npm i zustand-create-setter-fn</code>
				</p>
				<p
					dangerouslySetInnerHTML={{
						__html: pkg.description
							.replace(
								'Zustand',
								"<a href='https://zustand.docs.pmnd.rs/'>Zustand</a>",
							)
							.replace(/`(.+?)`/, '<code>$1</code>'),
					}}
				></p>
			</div>

			<section>
				<h2>🤔 Why use this?</h2>

				<p>In Short, it turns this:</p>

				<CodeHighlighter>
					{getSmallCodeSample(NonSetterFnExampleSource)}
				</CodeHighlighter>

				<p>Into this:</p>

				<CodeHighlighter>
					{getSmallCodeSample(ReactExampleSource)}
				</CodeHighlighter>
			</section>

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
				<details>
					<summary>View the React example code</summary>

					<CodeHighlighter>
						{replaceImport(ReactExampleSource)}
					</CodeHighlighter>
				</details>
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

				<VanillaTsExampleComponent />

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
				<VanillaJsExampleComponent />

				<details>
					<summary>Vanilla JavaScript code</summary>
					<CodeHighlighter>
						{replaceImport(VanillaJSExampleSource)}
					</CodeHighlighter>
				</details>
			</section>
			<div>
				<p>
					<a href="https://github.com/Dan503/zustand-create-setter-fn">
						<img
							src={githubLogo}
							height={20}
							width={20}
							alt=""
							className="logoImg"
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
				<p>
					<a href="https://www.npmjs.com/package/zustand-create-setter-fn">
						<img
							src={npmLogo}
							height={20}
							width={20}
							alt=""
							style={{
								transform: 'translateY(4px)',
								marginRight: 3,
							}}
						/>{' '}
						View on npm
					</a>
				</p>
			</div>
		</div>
	)
}

function getSmallCodeSample(fullCodeSource: string) {
	return fullCodeSource.substring(
		fullCodeSource.indexOf('const useCounterStore'),
		fullCodeSource.indexOf('}\n})') + 5,
	)
}

export default App
