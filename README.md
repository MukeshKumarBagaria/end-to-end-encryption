# End-to-End Encryption 
The project includes four different files, each showcasing a specific aspect of the encryption process.

## Introduction

This repository showcases the implementation of end-to-end encryption using the Diffie-Hellman key exchange algorithm and AES encryption. Encryption ensures secure communication between parties by allowing them to exchange encrypted messages while keeping their shared secrets private.

## File 1: diffie-hellman-shared-secret.js

This file demonstrates the usage of the Diffie-Hellman key exchange algorithm to establish a shared secret between two parties, Alice and Bob.

## File 2: ECDH.js

This file showcases the Elliptic Curve Diffie-Hellman (ECDH) key exchange algorithm, which offers enhanced security with less computational overhead compared to traditional Diffie-Hellman.

## File 3: ECDH-AES.js

This file demonstrates how to generate keys using ECDH and encrypt messages using AES-256.

## File 4: app.js

This file demonstrates end-to-end encryption using AES-256-GCM and ECDH. It showcases the confidentiality, integrity, and authenticity offered by GCM mode.



### How to use this repo

1. Clone the repo using

```bash
git clone https://github.com/MukeshKumarBagaria/end-to-end-encryption.git
```

2. Open terminal inside the downloaded project and install the dependencies using:

```bash
npm install
```

3. Finally run the script using:

```bash
npm start
```

