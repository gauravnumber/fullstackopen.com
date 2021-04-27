const bcrypt = require('bcrypt')

async function fun() {
	const result = await bcrypt.hash('ssh fir koi hai', 10)
	console.log('result', result)
	const foo = await bcrypt.compare('ssh fir koi hai', result)
	console.log('foo', foo)
}

fun()