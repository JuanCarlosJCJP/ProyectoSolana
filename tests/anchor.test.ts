import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TipJar } from "../target/types/tip_jar";

describe("tip_jar", () => {

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.TipJar as Program<TipJar>;

  const tipAccount = anchor.web3.Keypair.generate();

  it("Initialize Tip Account", async () => {

    await program.methods.initialize()
      .accounts({
        tipAccount: tipAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([tipAccount])
      .rpc();

    const account = await program.account.tipAccount.fetch(tipAccount.publicKey);

    console.log("Owner:", account.owner.toString());
    console.log("Total tips:", account.totalTips.toString());

  });

  it("Send Tip", async () => {

    const amount = new anchor.BN(10000000);

    await program.methods.sendTip(amount)
      .accounts({
        tipAccount: tipAccount.publicKey,
        user: provider.wallet.publicKey,
      })
      .rpc();

    const account = await program.account.tipAccount.fetch(tipAccount.publicKey);

    console.log("Total tips after tip:", account.totalTips.toString());

  });

  it("Withdraw Tips", async () => {

    await program.methods.withdraw()
      .accounts({
        tipAccount: tipAccount.publicKey,
        owner: provider.wallet.publicKey,
      })
      .rpc();

    const account = await program.account.tipAccount.fetch(tipAccount.publicKey);

    console.log("Total tips after withdraw:", account.totalTips.toString());

  });

});