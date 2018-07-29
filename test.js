"use strict";

const assert = require("assert");
const { ECKey, ECCurves } = require("./index.js");

const testCurve = curve => {
  const key1 = new ECKey(curve);
  const key2 = new ECKey(curve);

  const key3 = new ECKey(curve, key1.PrivateKey);
  const key4 = new ECKey(curve, key2.PublicKey, true);

  assert.strictEqual(
    Buffer.compare(
      key1.deriveSharedSecret(key2),
      key3.deriveSharedSecret(key4)
    ),
    0
  );
};

try {
  Object.keys(ECCurves)
    .map(curveName => ECCurves[curveName])
    .forEach(testCurve);

  console.log("Test OK");
} catch (e) {
  console.error(e);

  console.log("Test FAILURE");
  process.exit(1);
}
