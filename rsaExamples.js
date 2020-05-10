
const primality = require("./src/rsa/primality");


const composites = [ 32n, 36n, 28n, 26n, 8n, 561n, 1105n, 1729n, 8911n ];
const primes = [5n, 13n, 17n, 29n, 41n, 631n, 1721n, 5009n, 6569n, 7919n];


// const numbersToTest = [, 13n, 17n, 29n, 41n, 561n]; // 561n is a Carmichael number
// const results = numbersToTest.map( n => primality.fermatPrimalityTest(n,20,8));
// console.log(results);


let resultsMR = composites.map( n => primality.rabinMillerPrimalityTest(n,10,8));
console.log(resultsMR);
resultsMR = primes.map( n => primality.rabinMillerPrimalityTest(n,10,8));
console.log(resultsMR);
