import Certifily from 0xCERTIFILYADDRESS

transaction(content:String, insitution:String, description:String,previewContent:String,certType:UInt8) {

    let minter: &Certifily.NFTMinter
    let receiverAddrss : Address

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&Certifily.NFTMinter>(from: /storage/CertifilyNFTMinter)
            ?? panic("Could not borrow a reference to the NFT minter")

       self.receiverAddrss = signer.address
    }

    execute {
        // Borrow the recipient's public NFT collection reference
        let receiver = getAccount(self.receiverAddrss)
            .getCapability(/public/CertifilyNFTPublicCollection)
            .borrow<&{Certifily.CertifilyCollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        // Mint the NFT and deposit it to the recipient's collection
        self.minter.Mint(recipient: receiver, content:content, insitution:insitution, description:description, previewContent:previewContent, certType:certType)
    }
}
