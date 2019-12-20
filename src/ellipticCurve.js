

/**
  y^2 = x^3 + ax + b
*/
function makeEllipticCurve(a, b, prime) {

  this.a = a;
  this.b = b;
  this.prime = prime;

  this.toString = function() { return `y^2 = x^3 + ${a} x + ${b}` }

  this.makePoint = function(array) { return { x:array[0], y:array[1] } }

  // ref: https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm
  function egcd(a,b) {
    let s=0n, old_s=1n;
    let t=1n, old_t=0n;
    let r=b,  old_r=a;
    let tmp;
    while(r!==0n) {
      q = old_r/r;
      tmp = old_r; old_r = r; r=tmp-q*old_r;
      tmp = old_s; old_s = s; s=tmp-q*old_s;
      tmp = old_t; old_t = t; t=tmp-q*old_t;
    }
    return {
      bezout: [old_s, old_t],
      gcd: old_r
    };
  }

  function fieldModP(x) {
    let y = x%prime;
    if (y<0n) y += (-y/prime+1n)*prime;
    return y;
  }

  function invModp(a) {
    const r = egcd(a,prime);
    let s = r.bezout[0];
    return fieldModP(s);
  }

  this.double = function double(P) {
    // console.log(P.x);
    // console.log(b);
    const num = (3n*P.x**2n+a);
    const dem = (2n*P.y);
    // console.log(`${num}  ${dem}`);
    const s = fieldModP( num * invModp(dem) ) ; // the slope of the tangent
    // console.log(`s=${s}`);
    let r = [0n,0n];
    r[0] = fieldModP(s**2n - P.x - P.x);
    r[1] = fieldModP(s*(P.x-r[0]) - P.y);
    return this.makePoint(r);
  }

  this.add = function(P,Q) {
    if (P===null) return Q;
    if (Q===null) return P;
    let r = [0n,0n];
    let s;
    // when p,q are not the point at infinity O
    if (P.x!==Q.x) {
      // points with different x
      const num = fieldModP(P.y-Q.y);
      const dem = fieldModP(P.x-Q.x);
      s = fieldModP(num*invModp(dem)); // the slope between two points
    }
    else if (P.y===-Q.y) {
      // the points are in the same vertical line
      return null; // addition not defined in this case
    }
    else {
      // both points are the same
      const num = (3n*P.x**2n+a);
      const dem = (2n*P.y);
      s = fieldModP(num*invModp(dem)) ; // the slope of the tangent at P
    }
    r[0] = fieldModP(s**2n - P.x - Q.x);
    r[1] = fieldModP(s*(P.x-r[0]) - P.y);
    return this.makePoint(r);
  }

  this.isInCurve = function(P) {
    const lhs = fieldModP(P.y**2n);
    const rhs = fieldModP(P.x**3n + a*P.x + b);
    return lhs === rhs;
  }

  this.multiplyByScalar = function(P,k) {
    let Q = null;
    let R = P;
    while(k>0) {
      if (k%2n===1n) {
        Q = this.add(Q,R);
      }
      R = this.double(R);
      k /= 2n;
    }
    return Q;
  }

}


module.exports = { makeEllipticCurve: makeEllipticCurve };



// TESTS
let generator = [ 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798n, 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n ];
let prime = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2Fn; //  2n**256n - 2n**32n - 977n

const ec = new makeEllipticCurve(0n,7n,prime);
// console.log(ec.toString());

const G = ec.makePoint(generator);
// console.log(G);
// console.log(ec.isInCurve(G));

const G2 = ec.double(G);
// console.log(G2);

const G4 = ec.double(G2);
// console.log(G4);

const GplusG = ec.add(G,G);
console.log(GplusG);

let sum = G;
for(let i=2; i<100; i++) {
  sum = ec.add(sum,G);
  let dot = ec.multiplyByScalar(G, BigInt(i));
  console.log(`${i}: ${sum[0]===dot[0]}, ${sum[1]===dot[1]}`);
}
