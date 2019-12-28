/*
  An example of the Diffie-Hellman key-agreement protocol for EC
*/

const EC = require("./src/ellipticCurve.js");
const ECDH = require("./src/ecdh.js");

const generator = [ 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798n, 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n ];
const prime = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2Fn; //  2n**256n - 2n**32n - 977n

// Instantiate a well known ellipticCurve
const secp256k1 = new EC.makeEllipticCurve(0n,7n,prime);

const G = new secp256k1.makePoint(generator);

const alice = new ECDH.ecdh(secp256k1, G);
const bob   = new ECDH.ecdh(secp256k1, G);

alice.generateKeys();
console.log("Alice's");
console.log(`Private key: ${alice.privateKey}`);
console.log(`Public key: ${alice.publicKey.toString()}`);

bob.generateKeys();
console.log("Bob's");
console.log(`Private key: ${bob.privateKey}`);
console.log(`Public key: ${bob.publicKey.toString()}`);

bob.receive(alice.publicKey);
alice.receive(bob.publicKey);

console.log("Alice's shared secret:");
console.log(`${alice.sharedSecret.toString()}`);

console.log("Bob's shared secret:");
console.log(`${bob.sharedSecret.toString()}`);
