import Certifily from 0xCERTIFILYADDRESS

transaction {

     prepare(signer: AuthAccount) {
         if signer.borrow<&Certifily.Collection>(from: /storage/CertifilyNFTCollection) == nil {

            // Create a new empty collection
            let collection <- Certifily.createEmptyCollection()

            // save it to the account
            signer.save(<-collection, to: /storage/CertifilyNFTCollection)

            // create a public capability for the collection
            signer.link<&{Certifily.CertifilyCollectionPublic}>(
                    /public/CertifilyNFTPublicCollection,
                    target: /storage/CertifilyNFTCollection
                    )
        } 
     }

}
