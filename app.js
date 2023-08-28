
/**
 * AES_256_GCM and ECDH - 
 * GCM- Galios/Counter Mode allow use to send authenticated encrypted messages
 * and security comes with GCM are - 1.confidentiality , 2.integrity 3, Authenticity
 */


// Import the crypto module for cryptographic operations
const crypto = require('crypto');

// Retrieve the list of available elliptic curves
const curves = crypto.getCurves();
console.log("curves", curves);

// Alice generates her ECDH key pair using the 'secp256k1' curve
const alice = crypto.createECDH('secp256k1');
alice.generateKeys();

// Bob generates his ECDH key pair using the 'secp256k1' curve
const bob = crypto.createECDH('secp256k1');
bob.generateKeys();

// Get Alice's public key in base64 encoding
const alicePublicKeyBase64 = alice.getPublicKey().toString('base64');

// Get Bob's public key in base64 encoding
const bobPublicKeyBase64 = bob.getPublicKey().toString('base64');

// Alice computes the shared secret using Bob's public key
const aliceSharedKey = alice.computeSecret(bobPublicKeyBase64, 'base64', 'hex');

// Bob computes the shared secret using Alice's public key
const bobSharedKey = bob.computeSecret(alicePublicKeyBase64, 'base64', 'hex');

// Compare whether Alice's and Bob's computed shared keys are equal
console.log(aliceSharedKey === bobSharedKey);

// Log the computed shared keys
console.log('Alice shared Key: ', aliceSharedKey);
console.log('Bob shared Key: ', bobSharedKey);

// Define a random message to be encrypted
const MESSAGE = 'this is some random message...';

// Generate a random initialization vector (IV)
const IV = crypto.randomBytes(16);

// Create a cipher using Alice's shared key and IV for AES-GCM encryption
const cipher = crypto.createCipheriv(
  'aes-256-gcm',
  Buffer.from(aliceSharedKey, 'hex'),
  IV
);

// Encrypt the message and get the encrypted data
let encrypted = cipher.update(MESSAGE, 'utf8', 'hex');
encrypted += cipher.final('hex');

// Get the authentication tag from the cipher
const auth_tag = cipher.getAuthTag().toString('hex');

// Display the IV, encrypted data, and authentication tag
console.table({
  IV: IV.toString('hex'),
  encrypted: encrypted,
  auth_tag: auth_tag
});

// Create a payload by concatenating IV, encrypted data, and authentication tag
const payload = IV.toString('hex') + encrypted + auth_tag;

// Convert the payload to base64 encoding
const payload64 = Buffer.from(payload, 'hex').toString('base64');
console.log(payload64);

// Bob starts processing the payload
const bob_payload = Buffer.from(payload64, 'base64').toString('hex');

// Extract IV, encrypted data, and authentication tag from the payload
const bob_iv = bob_payload.substr(0, 32);
const bob_encrypted = bob_payload.substr(32, bob_payload.length - 32 - 32);
const bob_auth_tag = bob_payload.substr(bob_payload.length - 32, 32);

// Display the extracted values from the payload
console.table({ bob_iv, bob_encrypted, bob_auth_tag });

try {
  // Create a decipher using Bob's shared key and extracted IV for decryption
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(bobSharedKey, 'hex'),
    Buffer.from(bob_iv, 'hex')
  );

  // Set the authentication tag for the decipher
  decipher.setAuthTag(Buffer.from(bob_auth_tag, 'hex'));

  // Decrypt the data and get the original message
  let decrypted = decipher.update(bob_encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  // Display the decrypted message
  console.table({ DecryptedMessage: decrypted });
} catch (error) {
  // Display any decryption errors
  console.log(error.message);
}
