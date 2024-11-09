const people = {"SnVuaW9y":"RHVkYQ==","RHVkYQ==":"RWx0b24=","SnVjYQ==":"RWzDs2JpYQ==","UGF1bGE=":"SnVjYQ==","QXJtYW5kaW8=":"QWRyaWFuZQ==","RWzDs2JpYQ==":"TWFyaWE=","RWx0b24=":"QXJtYW5kaW8=","TWFyaWE=":"SnVuaW9y","QWRyaWFuZQ==":"UGF1bGE="};

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

	const c = document.querySelector('#real');
	c.innerHTML = `${who} pegou ${unmakeHash(people[id])}`;
});

const handleError = () => {
	const c = document.querySelector('main');
	c.innerHTML = `URL mal formada`;
}