import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/core/index.ts'],
	format: ['esm', 'cjs'],
	dts: true,
	clean: true,
	sourcemap: true,
	external: ['zustand'],
})
