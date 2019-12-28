/*
  The Diffie-Hellman key-agreement protocol for EC
*/

const random = require('random-bigint');

function ecdh(ec, generator) {

  this.ec = ec;
  this.g = generator;
  this.p = ec.prime;

  this.generateKeys = function generateKeys() {
    this.privateKey = random(bits(this.p)) % this.p;
    this.publicKey = this.ec.multiplyByScalar(this.g, this.privateKey);
  }

  function bits(x) {
    let bits = BigInt(0);
    while(2n**bits < x) bits++;
    return Number(bits);
  }

  this.receive = function(publicFromPartner) {
    this.sharedSecret = this.ec.multiplyByScalar(publicFromPartner, this.privateKey);
  }

}


module.exports = { ecdh };
