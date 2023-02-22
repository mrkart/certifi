import FungibleToken from 0x9a0766d93b6608b7

transaction(amount: UFix64, to: Address) {
  let vault: @FungibleToken.Vault
  
  prepare(currentUser: AuthAccount) {
    self.vault <- currentUser
      .borrow<&{FungibleToken.Provider}>(from: /storage/flowTokenVault)!
      .withdraw(amount: amount)
  }

  execute {
    getAccount(to)
      .getCapability(/public/flowTokenReceiver)!
      .borrow<&{FungibleToken.Receiver}>()!
      .deposit(from: <- self.vault)
  }
}
