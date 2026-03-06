# Tip Jar on Solana (Anchor Project)

## Description
This project implements a Tip Jar smart contract on the Solana blockchain using the Anchor framework.

The program allows users to send tips (SOL) to a shared account and allows the owner to withdraw the accumulated funds.

This project demonstrates the basic concepts of Solana smart contract development, including accounts, transactions, lamports handling, and testing.

---

## Features

- Initialize a Tip Jar account
- Send SOL tips to the jar
- Track total tips received
- Withdraw all collected tips
- Automated tests using Anchor

---

## Project Structure

tip-jar-project

programs/  
└── tip_jar/  
  └── src/  
    └── lib.rs  

tests/  
└── tip_jar.ts  

client/  
└── client.ts  

Anchor.toml  
package.json  
README.md  

---

## Technologies Used

- Solana Blockchain
- Rust
- Anchor Framework
- TypeScript
- Node.js

---

## Smart Contract Functions

### Initialize
Creates the tip account and sets the owner.

initialize()

### Send Tip
Allows a user to send SOL to the tip jar.

send_tip(amount)

### Withdraw
Allows the owner to withdraw all collected tips.

withdraw()

---

## Installation

### Install dependencies

Make sure you have installed:

- Solana CLI
- Anchor
- Node.js

Install packages:

npm install

---

## Build the Program

anchor build

---

## Deploy to Local Validator

Start local validator:

solana-test-validator

Deploy program:

anchor deploy

---

## Run Tests

anchor test

The tests will:

1. Initialize the tip account
2. Send a tip
3. Withdraw the funds

---

## Example Client Interaction

Run the client script:

ts-node client/client.ts

This script will:

1. Create the tip jar
2. Send a tip
3. Withdraw the tips

---

## Concepts Learned

This project demonstrates:

- Solana accounts
- Lamports transfers
- Anchor program structure
- Client interaction with smart contracts
- Automated testing in blockchain

---

## Future Improvements

Possible extensions:

- Multiple tip jars
- Tip history
- Frontend interface (React + Solana Wallet Adapter)
- NFT tipping rewards
- Tip leaderboard

---

## Author

Juan Carlos Juarez Perez

Blockchain learning project using Solana and Anchor.

---

## License

MIT License

  
