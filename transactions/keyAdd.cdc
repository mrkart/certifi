transaction(myPublicKey: String, signAlg: Int, hashAlg: Int) {  
  prepare(acc: AuthAccount) {
    var count: UInt16 = 0
    let numProposers:UInt16 = 1
    let signAlgorithm = signAlg == 1 ? SignatureAlgorithm.ECDSA_secp256k1 : SignatureAlgorithm.ECDSA_P256
    let hashAlgorithm = hashAlg == 1 ? HashAlgorithm.SHA2_256 : HashAlgorithm.SHA3_256
    let publicKey = PublicKey(
                    publicKey: myPublicKey.decodeHex(),
                    signatureAlgorithm: signAlgorithm
    )
    while count < numProposers {
        acc.keys.add(
            publicKey: publicKey,
            hashAlgorithm: hashAlgorithm,
            weight: 1000.0
        )
         count = count + 1
    }
  }
}