transaction(keyId: Int) {
    prepare(acct: AuthAccount) {
    acct.keys.revoke(keyIndex:keyId)
    }
}