/*

Examples of the elliptic curve operations


*/

let ellipticCurve = require("./src/ellipticCurve.js");

let generator = [ 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798n, 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n ];
let prime = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2Fn; //  2n**256n - 2n**32n - 977n

// Instantiate a well known ellipticCurve
const secp256k1 = new ellipticCurve.makeEllipticCurve(0n,7n,prime);
console.log(secp256k1.toString());

// Create a point and check it is in the curve
const G = secp256k1.makePoint(generator);
console.log(G);
console.log(secp256k1.isInCurve(G));

// Double the point
const G2 = secp256k1.double(G);
console.log(G2);

const G4 = secp256k1.double(G2);
console.log(G4);

// Add points
const GplusG = secp256k1.add(G,G);
console.log(GplusG);

// The point at infinity is the identity element
const O = secp256k1.PointAtInfinity;
const GplusO = secp256k1.add(G,O);
console.log(GplusO==G);

const OplusG = secp256k1.add(O,G);
console.log(OplusG==G);

// Inverse of a point
const invG = secp256k1.inverseOf(G);
console.log(`Inverse of G:`); console.log(invG);
const GplusInvG = secp256k1.add(G,invG);
console.log(`G + invG  = `); console.log(GplusInvG);


// Add and multiply points. Check for consistency
let sum = G;
for(let i=2; i<100; i++) {
  sum = secp256k1.add(sum,G);
  let dot = secp256k1.multiplyByScalar(G, BigInt(i));
  console.log(`${i}: ${sum[0]===dot[0]}, ${sum[1]===dot[1]}`);
}
