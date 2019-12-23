const assert = require("assert").strict; // node's built-in assertion library
const ellipticCurve = require("../src/ellipticCurve");

describe("ECC", function() {
  const a = 9n;
  const b = 17n;
  const prime = 23n;
  const ec = new ellipticCurve.makeEllipticCurve(a,b,prime);

  describe("EllipticCurve instantiation", function() {
      it("EC should not be null",function() {
        assert.ok(ec);
      });
      it("Parameter a is correct",function() {
        assert.equal(ec.a,a);
      });
      it("Parameter b is correct",function() {
        assert.equal(ec.b,b);
      });
      it("Parameter prime is correct",function() {
        assert.equal(ec.prime,prime);
      });
      it("Should not create invalid elliptic curves", function() {
        assert.throws(
          () => {new ellipticCurve.makeEllipticCurve(-12n,16n,prime)},
          {name:"Error" , message: "Invalid curve parameters"}
        );
      });
  });

  let G;
  describe("Creating and checking points in the curve", function() {
    G = ec.makePoint([16n,5n]);
    it("Should create points", function() {
      assert.ok(G);
    });
    it("Should verify if points are in the curve", function() {
      assert.ok(ec.isInCurve(G));
    });
    it("Should verify if a point is not in the curve", function() {
      assert.ok(!ec.isInCurve(ec.makePoint([15n,6n])));
    });
  });

  describe("Computes operations on points of the EC", function() {
    let twiceG, thriceG;
    it("computes the double of a point", function() {
      twiceG = ec.double(G);
      assert.deepStrictEqual(twiceG, {x:20n, y:20n});
    });
    it("computes the product of a point by a scalar", function() {
      thriceG = ec.multiplyByScalar(G,3n);
      assert.deepStrictEqual(thriceG, {x:14n, y:14n});
    });
    it("adds points on the EC", function() {
      let fiveTimesG = ec.add(twiceG, thriceG);
      assert.deepStrictEqual(fiveTimesG, {x:13n, y:10n});
    });
    it("computes composite expressions on points of the EC", function() {
      let nineG = ec.add(ec.add(twiceG, thriceG), ec.multiplyByScalar(G,4n));
      assert.deepStrictEqual(nineG, {x:4n, y:5n});
    });
  });


});
