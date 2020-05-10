const random = require('random-bigint');    // https://www.npmjs.com/package/random-bigint
const assert = require('assert');

function randomInRange(lo,hi,bits) {
  let a;
  do {
    a = random(bits)+lo
  } while(a<lo || a>hi);
  return a;
}


// Fermat primality test [PP2010] p. 189
// Well known false positives: Carmichael numbers
function fermatPrimalityTest(p, s, bits) {
  for(let i=0; i<s; i++) {
    const a = randomInRange(2n,p-2n,bits);
    if ( a**(p-1n)%p !== 1n) return false;
  }
  return true;
}


// Miller-Rabin primality test [CLR] p.969
// Returns true if 'a' is a witness of 'n' being a composite
// n-1 = 2**t*u
function witness(a,n,t,u) {
  assert.equal(n-1n, 2n**t*u);
  // console.log(`a=${a}, t=${t}, u=${u}`);
  let x0 = (a**u)%n;
  let x1 = 0;
  for(let i=1; i<=t; i++) {
    x1 = (x0*x0) % n;
    // console.log(`  x0=${x0}  x1=${x1}`);
    if (x1===1n && x0!==1n && x0!==n-1n) return true;
    x0 = x1;
  }
  // console.log(`* x0=${x0}, x1=${x1} == ${a**(n-1n)%n}`);
  assert.equal(x0, a**(n-1n)%n);
  if (x1!==1n) return true;
  return false;
}


// Miller-Rabin primality test [CLR] p.970
function rabinMillerPrimalityTest(n, s, bits) {
  assert(n>3);
  const { u, r } = decompose(n); // n-1 = 2**t*u = 2**u*r
  assert.equal(n-1n, 2n**u*r);
  // console.log(`n = ${n}`);
  for(let j=1; j<=s; j++) {
    const a = randomInRange(2n,n-2n,bits);
    // const a = 15n;
    if (witness(a,n,u,r)) {
      // console.log(`witness: ${a}`);
      return false;
    }
  }
  return true;
}



// Miller-Rabin primality test [PP2010] p. 191 (MALO)
function rabinMillerPrimalityTestMalo(p, s, bits) {
  const { u, r } = decompose(p);
  console.log(`${u} ${r}`);
  for(let i=0; i<s; i++) {
    const a = randomInRange(2n,p-2n,bits);
    console.log(`a = ${a}`);
    let z = (a**r)%p;
    console.log(`z = ${z}`);
    if (z!==1n && z!==p-1n) {
      for(let j=1; j<u; j++) {
        z = (z*z)%p;
        console.log(`j:${j} z = ${z}`);
        if (z===1n) return false;
      }
      if (z!==p-1n) return false;
    }
  }
  return true;
}

// Finds u,r such that p-1=2**u*r
function decompose(p) {
  let q=p-1n;
  let u=0n;
  while (q%2n==0n) { u++; q/=2n; }
  const r = (p-1n)/(2n**u);
  // console.log(`u=${u}, r=${r}, ok=${p-1n===2n**u*r}`);
  return { u, r };
}


module.exports = { fermatPrimalityTest, rabinMillerPrimalityTest };
