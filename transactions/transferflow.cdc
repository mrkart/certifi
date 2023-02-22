import FungibleToken from 0x01cf0e2f2f715450
import FlowToken from 0x7e60df042a9c0868

transaction(amount: UFix64, to: Address) {
    let sentVault: @FungibleToken.Vault
    let flowVault: @FlowToken.Vault
    prepare(signer: AuthAccount) {
      // Get the signer's FLOW vault and the FLOW vault of the FlowToken contract
      let account = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
        ?? panic("Signer missing FLOW vault")
      flowVault = account
      let vaultRef = getAccount(to)
        .getCapability(/public/flowTokenReceiver)
        .borrow<&{FungibleToken.Receiver}>()
        ?? panic("Could not borrow receiver reference to public FungibleToken receiver")
      // Get the signer's FungibleToken vault and withdraw the tokens
      sentVault <- signer.withdraw(amount: amount)
      sentVault.transfer(to: vaultRef, amount: amount)
    }
}
