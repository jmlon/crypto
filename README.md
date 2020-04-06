# crypto
Common cryptographic algorithms implemented the BigInt type available since nodes.js v. 10.

## Elliptic Curve
Implementation of the basic elliptic curve operations on F_p:
- Add two points
- Double a point
- Multiply a point by a scalar
- Check if a point is in the elliptic curve
- The inverse of a point wrt. addition

See the file examples.js for basic usage patterns.


## Abount the examples
- `npm test` : Run mocha tests.
- `node ecExamples.js`   : Example demonstrating elliptic curve operations.
- `node ecdhExample.js`  : Sample program for a Diffie-Hellman key agreement.
- `node ecdsaExample.js` : Sample program for testing the DSA.

## References

- [Corbellini, A. Elliptic Curve Cryptography: a gentle introduction](https://andrea.corbellini.name/2015/05/17/elliptic-curve-cryptography-a-gentle-introduction/)

- [Corbellini, A. Elliptic Curve Cryptography: finite fields and discrete logarithms](https://andrea.corbellini.name/2015/05/23/elliptic-curve-cryptography-finite-fields-and-discrete-logarithms/)

- [Corbellini, A. Elliptic Curve Cryptography: ECDH and ECDSA](https://andrea.corbellini.name/2015/05/30/elliptic-curve-cryptography-ecdh-and-ecdsa/)

- [Schoof's algorithm](https://en.wikipedia.org/wiki/Schoof%27s_algorithm)
