const fetch = require('isomorphic-fetch');
/*
 * https://levelup.gitconnected.com/all-possible-ways-of-making-an-api-call-in-plain-javascript-c0dee3c11b8b  
 *
 * shows how to do the fetch without this library
 */
async function fetchData(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	} catch (error) {
		console.error('Unable to fetch data:', error);
	}
}

function fetchNames(nameType) {
	return fetchData(`https://www.randomlists.com/data/names-${nameType}.json`);
}

function pickRandom(list) {
	return list[Math.floor(Math.random() * list.length)];
}

async function generateName(gender) {
	try {
		const response = await Promise.all([
			fetchNames(gender || pickRandom(['male', 'female'])),
			fetchNames('surnames')
		]);

		const [firstNames, lastNames] = response;

		const firstName = pickRandom(firstNames.data);
		const lastName = pickRandom(lastNames.data);

		return `${firstName} ${lastName}`;
	} catch (error) {
		console.error('Unable to generate name:', error);
	}
}

function logRandomName(gender) {
	generateName(gender).then(console.log);
}

logRandomName();

/*
process.argv.slice(2).forEach((val, index) => {
	let parsed = parseInt(`${val}`, 10);
	if (isNaN(parsed)) {
		console.log(`parameters must be base 10 integers`);
	} else {
		for (let i = 0; i < parsed; i++) {
			logRandomName();
		}
	}
}
) */
