var xpNeeded = level => (5 * (level ** 2)) + (25 * level) + 100;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("What level?", level => console.log(xpNeeded(level)));
