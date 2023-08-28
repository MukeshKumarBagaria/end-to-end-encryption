//TODO: How to genrate keys and how to genrate shared secrect key between clients


// Import the crypto module for cryptographic operations
const crypto = require('crypto');

// Create Diffie-Hellman instances for Alice and Bob using the 'modp15' (3072-bit prime) group
const alice = crypto.getDiffieHellman('modp15');
const bob = crypto.getDiffieHellman('modp15');

// Generate key pairs for Alice and Bob
alice.generateKeys();
bob.generateKeys();

// Compute shared secrets for Alice and Bob using each other's public keys
const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
const bobSecret = bob.computeSecret(alice.getPublicKey(), null, 'hex');

// Calculate and display the number of bits in the prime number to verify it's 3072-bit
console.log(alice.getPrime().toString('hex').length * 4);

// Check if both Alice and Bob have generated the same shared secret
console.log(aliceSecret === bobSecret);

// Display the shared secret computed by Alice
console.log(aliceSecret);

// Display the shared secret computed by Bob
console.log(bobSecret);
