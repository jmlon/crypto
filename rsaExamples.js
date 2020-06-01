
const primality = require("./src/rsa/primality");

const numbersToTest = [32n, 36n, 28n, 26n, 8n, 13n, 17n, 29n, 41n, 561n]; // 561n is a Carmichael number
const results = numbersToTest.map( n => primality.fermatPrimalityTest(n,20,8));
console.log(results);
