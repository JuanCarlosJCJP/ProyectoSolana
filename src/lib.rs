use anchor_lang::prelude::*;

declare_id!("Tip111111111111111111111111111111111111111");

#[program]
pub mod tip_jar {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let tip_account = &mut ctx.accounts.tip_account;
        tip_account.total_tips = 0;
        tip_account.owner = *ctx.accounts.user.key;
        Ok(())
    }

    pub fn send_tip(ctx: Context<SendTip>, amount: u64) -> Result<()> {
        let tip_account = &mut ctx.accounts.tip_account;

        **tip_account.to_account_info().try_borrow_mut_lamports()? += amount;
        **ctx.accounts.user.to_account_info().try_borrow_mut_lamports()? -= amount;

        tip_account.total_tips += amount;

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        let tip_account = &mut ctx.accounts.tip_account;

        let amount = **tip_account.to_account_info().lamports.borrow();

        **tip_account.to_account_info().try_borrow_mut_lamports()? -= amount;
        **ctx.accounts.owner.to_account_info().try_borrow_mut_lamports()? += amount;

        tip_account.total_tips = 0;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 40)]
    pub tip_account: Account<'info, TipAccount>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SendTip<'info> {
    #[account(mut)]
    pub tip_account: Account<'info, TipAccount>,
    
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut, has_one = owner)]
    pub tip_account: Account<'info, TipAccount>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
}

#[account]
pub struct TipAccount {
    pub owner: Pubkey,
    pub total_tips: u64,
}