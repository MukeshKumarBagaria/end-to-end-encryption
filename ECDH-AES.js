// Import the crypto module for cryptographic operations
const crypto = require('crypto');

// Create Alice's ECDH instance using the secp256k1 curve and generate her keys
const alice = crypto.createECDH('secp256k1');
alice.generateKeys();

// Create Bob's ECDH instance using the secp256k1 curve and generate his keys
const bob = crypto.createECDH('secp256k1');
bob.generateKeys();

// Convert Alice's public key to base64 string
const alicePublicKeyBase64 = alice.getPublicKey().toString('base64');

// Convert Bob's public key to base64 string
const bobPublicKeyBase64 = bob.getPublicKey().toString('base64');

// Alice computes the shared secret using Bob's public key
const aliceSharedKey = alice.computeSecret(bobPublicKeyBase64, 'base64', 'hex');

// Bob computes the shared secret using Alice's public key
const bobSharedKey = bob.computeSecret(alicePublicKeyBase64, 'base64', 'hex');

// Check if Alice and Bob have the same shared key
console.log('Shared keys match:', aliceSharedKey === bobSharedKey);

// Log the shared keys for both Alice and Bob
console.log('Alice shared key:', aliceSharedKey);
console.log('Bob shared key:', bobSharedKey);

// Import the aes256 module for AES-256 encryption
const aes256 = require('aes256');

// Define the message to be encrypted
const message = 'this is some random message...';

// Alice encrypts the message using AES-256 and her shared key
const encrypted = aes256.encrypt(aliceSharedKey, message);

// At this point, the encrypted message needs to be transferred to Bob, typically through a secure channel

// Bob decrypts the received encrypted message using his shared key
const decrypted = aes256.decrypt(bobSharedKey, encrypted);

// Log the encrypted and decrypted messages
console.table({ encrypted, decrypted });
