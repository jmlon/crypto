const random = require('random-bigint');    // https://www.npmjs.com/package/random-bigint


function randomInRange(lo,hi,bits) {
  let a;
  do {
    a = random(bits)+lo
  } while(a<lo || a>hi);
  return a;
}


// Fermat primality test
// Well known false positives: Carmichael numbers
function fermatPrimalityTest(p, s, bits) {
  for(i=0; i<s; i++) {
    const a = randomInRange(2n,p-2n,bits);
    if ( a**(p-1n)%p !== 1n) return false;
  }
  return true;
}


// Miller-Rabin primality test
function rabinMillerPrimalityTest(p) {

}

// Finds u,r such that p-1=2**u*r
function decompose(p) {
  const q=p-1n;
  let u=0n;
  while (q%2n==0n) { u++; q/=2n; }
  
}


module.exports = { fermatPrimalityTest };
