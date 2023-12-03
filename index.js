const people = {"UGF1bGE=":"RWzDs2JpYQ==","RWx0b24gKHBhaSk=":"SnVuaW9y","SnVuaW9y":"SnVjYQ==","RHVkYQ==":"RWx0b24gKHBhaSk=","QXJtYW5kaW8=":"QWRyaWFuZQ==","RWzDs2JpYQ==":"TWFyaWEgQW50w7RuaWE=","QWRyaWFuZQ==":"RHVkYQ==","TWFyaWEgQW50w7RuaWE=":"QXJtYW5kaW8=","SnVjYQ==":"UGF1bGE="};

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