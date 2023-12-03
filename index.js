const people = {"UGF1bGE=":"RWx0b24gKHBhaSk=","RWx0b24gKHBhaSk=":"QXJtYW5kaW8=","SnVuaW9y":"UGF1bGE=","RHVkYQ==":"SnVuaW9y","QXJtYW5kaW8=":"TWFyaWEgQW50w7RuaWE=","RWzDs2JpYQ==":"SnVjYQ==","QWRyaWFuZQ==":"RWzDs2JpYQ==","TWFyaWEgQW50w7RuaWE=":"QWRyaWFuZQ==","SnVjYQ==":"RHVkYQ=="};

const base64ToBytes = (base64) => {
	const binString = atob(base64);
	return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

const unmakeHash = (h) => {
	return new TextDecoder().decode(base64ToBytes(h));
}

document.addEventListener("DOMContentLoaded", () => {
	if (window.location.search.indexOf('?id=') < 0) {
		handleError();
		return;
	}

	let id = window.location.search.replace('?id=', '');
	console.log(id);
	const who = unmakeHash(id);

	const prank = document.querySelector('#prank');
	prank.innerHTML = `${who}`;
	const c = document.querySelector('#real');
	c.innerHTML = `${who} pegou ${unmakeHash(people[id])}`;
});

const handleError = () => {
	const c = document.querySelector('main');
	c.innerHTML = `URL mal formada`;
}