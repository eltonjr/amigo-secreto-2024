const fs = require('fs');
const baseurl = 'http://eltonjr.github.io/amigo-secreto/';

// node make.js Turma Fulano,Cicrano,...
if (process.argv.length < 4) {
    throw new Error("Rode o script usando 'node make.js Turma Fulano,Cicrano,...'");
}
const crew = process.argv[2];
const people = process.argv[3].split(',');

// Checks if person1 did not get person1
const assertNotSelf = (original, shuffled) => {
    for (let i = 0; i < original.length; i++) {
        if (original[i] === shuffled[i]) {
            throw new Error(`${original[i]} pegou ${shuffled[i]}`);
        }
    }
}

// Checks that the result is one single cycle instead of smaller ones
const assertCycle = (m, seed, size) => {
    let visited = 0;
    let current = seed;
    // console.log(m);
    while (true) {
        visited++;
        let tmp = m[current];
        current = tmp;
        // console.log(`size:${size}, vis:${visited}, seed:${seed}, curr:${current}`);
        if (visited === size) {
            break;
        }
        if (current === seed) {
            throw new Error(`Ciclo muito pequeno`);
        }
    }
}

// Fisher-Yates shuffle from stack overflow
const shuffle = (array) => {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

// Hashing results to base64, from MDN
const base64ToBytes = (base64) => {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}
  
const bytesToBase64 = (bytes) => {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
}

const makeHash = (name) => {
    return bytesToBase64(new TextEncoder().encode(name));
}

const toMap = (arr) => arr.map((s, i) => {
    return {
        original: people[i],
        shuffled: s
    };
    }).reduce((a,b) => {
        a[b.original] = b.shuffled;
        return a;
    }, {});

let shuffled = [...people];
let asmap = {};
let i = 0;
while (true) {
    i++;
    console.log(`Tentativa ${i}`);
    try {
        shuffled = shuffle(shuffled);
        // console.log(people);
        // console.log(shuffled);
        asmap = toMap(shuffled);
        assertNotSelf(people, shuffled);
        assertCycle(asmap, people[0], people.length);
    } catch (e) {
        // console.log(e);
        console.log('Tentando de novo');
        continue;
    }
    break;
}

// shuffled.forEach((s, i) => console.log(`${people[i]} pegou ${s} - ${makeHash(s)}`));
shuffled.forEach((s, i) => console.log(`Para ${s}: ${baseurl}?id=${makeHash(s)}`));

const hashed = Object.keys(asmap).reduce((a, b) => {
    a[makeHash(b)] = makeHash(asmap[b]);
    return a;
}, {});

fs.writeFileSync('sorteio.json', JSON.stringify(hashed, null, '  '), 'utf8');

let indexhtml = fs.readFileSync('index_template.html').toString();
let newindexhtml = indexhtml.replace('%%crew%%', crew);
fs.writeFileSync('index.html', newindexhtml, 'utf8');

let indexjs = fs.readFileSync('index_template.js').toString();
let newindexjs = indexjs.replace('%%people%%', JSON.stringify(hashed));
fs.writeFileSync('index.js', newindexjs, 'utf8');
