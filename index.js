const exec = require('util').promisify(require('child_process').exec)
const { writeFile } = require('fs').promises
import { blueBright, red } from 'ansi-colors'

export const change = async({ config, filepath }) => {
	try {
		const { input, filter, outputStatic } = config.json
		const { stdout: unparsed } = await exec(`node -r ./node_modules/@sapper-dragon/json/node_modules/esm/index.js -e "require('./${input}/${filepath}').compile()"`)
		const reparsed = JSON.parse(unparsed)
		const result = JSON.stringify(reparsed, null, '\t')
		const path = `${outputStatic}/${filepath.replace(filter, '.json')}`
		await writeFile(path, result + '\n')
		console.log('~>', blueBright('Finished generating JSON from js generator:'))
		console.log(`    ${path}`)
	} catch (error) {
		console.error(red('Error:'))
		console.error(error)
	}
	console.log()
}

export const remove = async({ config, filepath }) => {
	try {
		const { filter, outputStatic } = config.json
		const path = `${outputStatic}/${filepath.replace(filter, '.json')}`
		const { stdout } = await exec(`rm -f ${path}`)
		if (stdout) { console.log(stdout) }
		console.log('~>', blueBright('Removing json files:'))
		console.log(`    ${path}`)
	} catch (error) {
		console.error(red('Error:'))
		console.error(error)
	}
	console.log()
}
