

/**
 * Elliptic curves of the form y^2 = x^3 + ax + b
 * @type {EllipticCurve}
 */

function makeEllipticCurve(a, b, aprime) {

  if (4n*a**3n+27n*b**2n===0n) {
    //console.error('Singular curve. Cannot instantiate.');
    throw new Error('Invalid curve parameters');
  }

  this.a = a;
  this.b = b;
  this.prime = aprime;

  this.toString = function() { return `y^2 = x^3 + ${a} x + ${b}` }

  this.makePoint = function(array) {
    this.x = array[0];
    this.y = array[1];
  }
  this.makePoint.prototype.toString = function() { return `(${this.x}, ${this.y})`; };

  this.PointAtInfinity = new this.makePoint([null, null]);

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

  this.fieldModP = function(x) {
    let y = x % this.prime;
    if (y<0n) y += (-y/this.prime+1n)*this.prime;
    return y;
  }

  this.invModp = function(a) {
    return this.invModx(a,this.prime);
  }

  this.invModx = function(a,x) {
    const r = egcd(a,x);
    let s = r.bezout[0];
    let y = s%x;
    if (y<0n) y += (-y/x+1n)*x;
    return y;
  }


  this.double = function double(P) {
    // console.log(P.x);
    // console.log(b);
    const num = (3n*P.x**2n+a);
    const dem = (2n*P.y);
    // console.log(`${num}  ${dem}`);
    const s = this.fieldModP( num * this.invModp(dem) ) ; // the slope of the tangent
    // console.log(`s=${s}`);
    let r = [0n,0n];
    r[0] = this.fieldModP(s**2n - P.x - P.x);
    r[1] = this.fieldModP(s*(P.x-r[0]) - P.y);
    return new this.makePoint(r);
  }

  this.add = function(P,Q) {
    if (P===null || P.x==null) return Q;
    if (Q===null || Q.x==null) return P;
    let r = [0n,0n];
    let s;
    // when p,q are not the point at infinity O
    if (P.x!==Q.x) {
      // points with different x
      const num = this.fieldModP(P.y-Q.y);
      const dem = this.fieldModP(P.x-Q.x);
      s = this.fieldModP(num*this.invModp(dem)); // the slope between two points
    }
    else if ( (P.y+Q.y)%this.prime === 0n ) {
      // the points are in the same vertical line
      return this.PointAtInfinity;
    }
    else {
      // both points are the same
      const num = (3n*P.x**2n+a);
      const dem = (2n*P.y);
      s = this.fieldModP(num*this.invModp(dem)) ; // the slope of the tangent at P
    }
    r[0] = this.fieldModP(s**2n - P.x - Q.x);
    r[1] = this.fieldModP(s*(P.x-r[0]) - P.y);
    return new this.makePoint(r);
  }

  this.isInCurve = function(P) {
    const lhs = this.fieldModP(P.y**2n);
    const rhs = this.fieldModP(P.x**3n + a*P.x + b);
    return lhs === rhs;
  }

  this.multiplyByScalar = function(P,k) {
    let Q = null;
    let R = P;
    while(k>0n) {
      if (k%2n===1n) {
        Q = this.add(Q,R);
      }
      R = this.double(R);
      k /= 2n;
    }
    return Q;
  }

  this.inverseOf = function(P) {
    return new this.makePoint([ P.x, (this.prime-P.y) ]);
  }


  // TODOs
  // 1. Implement Schoof's algorithm to calculate the order of the group
  // 2. Calculate the order of the subgroup of a point P



}


module.exports = { makeEllipticCurve: makeEllipticCurve };
