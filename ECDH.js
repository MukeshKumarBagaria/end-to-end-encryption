/** 
Elliptic-Curve Diffie-Hellman(ECDH) are much more powerful in the way that they are more secure and required less computing power for same amount of security eg. the shared secrect key 
*/

// Import the crypto module for cryptographic operations
const crypto = require('crypto');

// Create ECDH instances for Alice and Bob using the 'secp256k1' curve
const alice = crypto.createECDH('secp256k1');
alice.generateKeys();

const bob = crypto.createECDH('secp256k1');
bob.generateKeys();

// Get the base64-encoded public keys of Alice and Bob
const alicePublicKeyBase64 = alice.getPublicKey().toString('base64');
const bobPublicKeyBase64 = bob.getPublicKey().toString('base64');

// Compute shared secrets using each other's public keys
const aliceSharedKey = alice.computeSecret(bobPublicKeyBase64, 'base64', 'hex');
const bobSharedKey = bob.computeSecret(alicePublicKeyBase64, 'base64', 'hex');

// Check if Alice's and Bob's computed shared keys are equal
console.log(aliceSharedKey === bobSharedKey);

// Display the computed shared keys (in hexadecimal)
console.log('Alice shared Key: ', aliceSharedKey);
console.log('Bob shared Key: ', bobSharedKey);

// Display the length of the shared keys in bits (should be 256 bits for secp256k1 curve)
console.log(
  'Shared Key length of alice (same as bob): ',
  aliceSharedKey.length * 4
);
console.log(
  'Shared Key length of bob (same as alice): ',
  aliceSharedKey.length * 4
);
