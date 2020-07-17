import pkg from './package.json'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'

// import commonJS from 'rollup-plugin-commonjs'
// import resolve from '@rollup/plugin-node-resolve'

export default {
	input: pkg.input,
	
	plugins: [
		
		// resolve(),
			
		babel({
			exclude: 'node_modules/**',
			presets: ['@babel/preset-react', "@babel/preset-env"]
		}), 
		
		// commonJS({
		// 	include: 'node_modules/**',
		// 	namedExports: {
		// 		'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
		// 		'node_modules/react-dom/index.js': ['render']
		// 	}
		// }),
		
		postcss({
			extensions: ['.css']
		}),
		
	],
	
	output: [
		{
			file: pkg.main,
			format: 'es',
			sourcemap: true,
			strict: false,
		}
	],
	external: ['react', 'react-dom']
}
