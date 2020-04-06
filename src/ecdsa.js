const random = require('random-bigint');

/*
  n = order of the subgroup. Must be prime
  z = hash of the message trucated to the bitlength of n
  dA = Alice's private key
  hA = Alice's public key
*/

function ecdsa(ec, generator, n) {

  this.ec = ec;       // elliptic curve used for signing
  this.G = generator; // Generator point in the curve
  this.n = n;         // order of the subgroup

  this.sign = function(z,dA) {
    let k,p,r,s;
    do {
      do {
        k = random(bits(this.n)) % this.n;
        p = this.ec.multiplyByScalar(this.G, k);
        r = p.x % n;
      } while (r==0n);
      let kinv = this.ec.invModx(k, this.n);
      s = kinv*(z+r*dA) % this.n;     // the signature
    } while(s==0);
    return { s: s, r: r };
  }

  function bits(x) {
    let bits = BigInt(0);
    while(2n**bits < x) bits++;
    return Number(bits);
  }

  this.verify = function(z, sign, hA) {
    const sinv = this.ec.invModx(sign.s, this.n);
    const u1 = sinv*z % this.n;
    const u2 = sinv*sign.r % this.n;
    const p = ec.add( ec.multiplyByScalar(this.G,u1), ec.multiplyByScalar(hA,u2));
    return sign.r === p.x % this.n;
  }

}


module.exports = { ecdsa };
