import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TipJar } from "./idl/tip_jar.json";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const programId = new anchor.web3.PublicKey("Tip111111111111111111111111111111111111111");

const program = new Program<TipJar>(TipJar, programId, provider);

const tipAccount = anchor.web3.Keypair.generate();

async function main() {

  console.log("Initializing Tip Jar...");

  await program.methods.initialize()
    .accounts({
      tipAccount: tipAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([tipAccount])
    .rpc();

  console.log("Tip jar created:", tipAccount.publicKey.toString());

  console.log("Sending tip...");

  const amount = new anchor.BN(10000000);

  await program.methods.sendTip(amount)
    .accounts({
      tipAccount: tipAccount.publicKey,
      user: provider.wallet.publicKey,
    })
    .rpc();

  console.log("Tip sent!");

  console.log("Withdrawing tips...");

  await program.methods.withdraw()
    .accounts({
      tipAccount: tipAccount.publicKey,
      owner: provider.wallet.publicKey,
    })
    .rpc();

  console.log("Tips withdrawn!");

}

main();