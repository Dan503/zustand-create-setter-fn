import SyntaxHighlighter from 'react-syntax-highlighter'
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface Props {
	children: string
	className?: string
}

export function CodeHighlighter({ children }: Props) {
	return (
		<div
			style={{
				textAlign: 'left',
				overflow: 'auto',
				maxWidth: 'calc(100vw - 40px)',
			}}
		>
			<SyntaxHighlighter language="typescript" style={gruvboxDark}>
				{children + '\n'}
			</SyntaxHighlighter>
		</div>
	)
}
