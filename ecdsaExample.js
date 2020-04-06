
/*
  An example of the Elliptic Curve Digital Signing Algorithm
*/

const EC = require("./src/ellipticCurve.js");
const ECDH = require("./src/ecdh.js");
const ECDSA = require("./src/ecdsa.js");

const generator = [ 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798n, 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n ];
const prime = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2Fn; //  2n**256n - 2n**32n - 977n
const n = 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n; // Order of the subgroup

// Instantiate a well known ellipticCurve
const secp256k1 = new EC.makeEllipticCurve(0n,7n,prime);
const G = new secp256k1.makePoint(generator);

const alice = new ECDH.ecdh(secp256k1, G);

alice.generateKeys();
// console.log("Alice's");
// console.log(`Private key: ${alice.privateKey}`);
// console.log(`Public key: ${alice.publicKey.toString()}`);

const ecdsa = new ECDSA.ecdsa(secp256k1,G,n);
messageHash = 0x1234567890n;
signature = ecdsa.sign(messageHash, alice.privateKey);
valid = ecdsa.verify(messageHash, signature, alice.publicKey);
console.log(valid);
