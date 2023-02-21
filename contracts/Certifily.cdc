// Certifily NFT Smart Contract
// NFT             : www.Certifi.ly
// Version         : 0.0.1
// Blockchain      : Flow www.onFlow.org

import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
import FungibleToken from 0x9a0766d93b6608b7

pub contract Certifily: NonFungibleToken {
   certT
    // Total number of token supply
    pub var totalSupply: UInt64

    /// Path where the `Collection` is stored
    pub let certifilyStoragePath: StoragePath

    /// Path where the public capability for the `Collection` is
    pub let certifilyPublicPath: PublicPath

    /// NFT Minter
    pub let certifilyMinterPath: StoragePath
    
    // Contract Events
    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)
    pub event Mint(id: UInt64, content:String, owner: Address?, insitution:String)

    // TOKEN RESOURCE
    pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {

        // Unique identifier for NFT Token
        pub let id :UInt64

        // Meta data to store token data (use dict for data)
        access(self) let metaData: {String : String}

        pub fun getMetadata():{String: String} {
            return self.metaData
        }

        // NFT token insitution
        pub let insitution:String

        pub let certType:UInt8

        // Certificate token holder address
        pub let holder:Address?


        // In current store static dict in meta data
        init(id : UInt64, content : String, insitution:String, description:String , holder:Address?,previewContent:String,certType:UInt8) {
            self.id = id
            self.metaData = {"content" : content, "description": description, "previewContent":previewContent }
            self.holder = holder
            self.insitution = insitution
            self.certType = certType
        }

        pub fun getViews(): [Type] {
            return [
                Type<MetadataViews.Display>(),
                Type<MetadataViews.ExternalURL>(),
                Type<MetadataViews.NFTCollectionData>(),
                Type<MetadataViews.NFTCollectionDisplay>(),
                Type<MetadataViews.Serial>(),
                Type<MetadataViews.Traits>()
            ]
        }

        pub fun resolveView(_ view: Type): AnyStruct? {
            switch view {
                case Type<MetadataViews.Display>():
                    return MetadataViews.Display(
                        insitution: self.insitution,
                        description: self.metaData["description"]!,
                        thumbnail: MetadataViews.HTTPFile(
                            url: self.metaData["previewContent"]!
                        )
                    )
                case Type<MetadataViews.Serial>():
                    return MetadataViews.Serial(
                        self.id
                    )
                case Type<MetadataViews.ExternalURL>():
                    return MetadataViews.ExternalURL("https://certifi.ly")
                case Type<MetadataViews.NFTCollectionData>():
                    return MetadataViews.NFTCollectionData(
                        storagePath: Certifily.certifilyStoragePath,
                        publicPath: Certifily.certifilyPublicPath,
                        providerPath: /private/CertifilyNFTCollection,
                        publicCollection: Type<&Certifily.Collection{Certifily.CertifilyCollectionPublic}>(),
                        publicLinkedType: Type<&Certifily.Collection{Certifily.CertifilyCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(),
                        providerLinkedType: Type<&Certifily.Collection{Certifily.CertifilyCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(),
                        createEmptyCollectionFunction: (fun (): @NonFungibleToken.Collection {
                            return <-Certifily.createEmptyCollection()
                        })
                    )
                case Type<MetadataViews.NFTCollectionDisplay>():
                    let media = MetadataViews.Media(
                        file: MetadataViews.HTTPFile(
                            url: "https://alpha.certifi.ly/Certifily-icon.png"
                        ),
                        mediaType: "image/png"
                    )
                    return MetadataViews.NFTCollectionDisplay(
                        insitution: "Certifily Collection",
                        description: "Next-gen NFT documents B2B SaaS platform for all-gen",
                        externalURL: MetadataViews.ExternalURL("https://certifi.ly"),
                        squareImage: media,
                        bannerImage: media,
                        socials: {
                            "twitter": MetadataViews.ExternalURL("https://twitter.com/certifily"),
                            "instagram": MetadataViews.ExternalURL("https://www.instagram.com/certifi.ly/"),
                            "discord" : MetadataViews.ExternalURL("https://discord.io/certifily")
                        }
                    )
                case Type<MetadataViews.Traits>():
                    return []

            }
            return nil
        }

    }

    // Account's public collection
    pub resource interface CertifilyCollectionPublic {

        pub fun deposit(token:@NonFungibleToken.NFT)

        pub fun getIDs(): [UInt64]

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT

        pub fun borrowCertifily(id: UInt64): &Certifily.NFT? {
            // If the result isn't nil, the id of the returned reference
            // should be the same as the argument to the function
            post {
                (result == nil) || (result?.id == id):
                    "Cannot borrow CaaPass reference: The ID of the returned reference is incorrect"
            }
        }

    } 

    // NFT Collection resource
    pub resource Collection : CertifilyCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection  {
        
        // Contains caller's list of NFTs
        pub var ownedNFTs: @{UInt64 : NonFungibleToken.NFT}

        init() {
            self.ownedNFTs <- {}
        }

        pub fun deposit(token: @NonFungibleToken.NFT) {

            let token <- token as! @Certifily.NFT

            let id: UInt64 = token.id

            // add the new token to the dictionary which removes the old one
            let oldToken <- self.ownedNFTs[id] <- token

            emit Deposit(id: id, to: self.owner?.address)

            destroy oldToken
        }

        // function returns token keys of owner
        pub fun getIDs():[UInt64] {
            return self.ownedNFTs.keys
        }

        // function returns token data of token id
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
        }

        // Gets a reference to an NFT in the collection as a Certifily,
        // exposing all of its fields.
        pub fun borrowCertifily(id: UInt64): &Certifily.NFT? {
            if self.ownedNFTs[id] != nil {
                let ref = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
                return ref as! &Certifily.NFT
            } else {
                return nil
            }
        }

        // function to check wether the owner have token or not
        pub fun tokenExists(id:UInt64) : Bool {
            return self.ownedNFTs[id] != nil
        }

        pub fun withdraw(withdrawID:UInt64) : @NonFungibleToken.NFT {

            let ref = (&self.ownedNFTs[withdrawID] as auth &NonFungibleToken.NFT?)!

            let val = ref as! &Certifily.NFT

            if val.certType == 1 {
                panic("Cert Type is not allowed to withdraw")
            }
                         
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")

            emit Withdraw(id: token.id, from: self.owner?.address)

            return <-token    

        }

        pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
            let nft = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
            let CertifilyNFT = nft as! &Certifily.NFT
            return CertifilyNFT as &AnyResource{MetadataViews.Resolver}
        }

        destroy(){
            destroy self.ownedNFTs
        }

    }

    // NFT MINTER
    pub resource NFTMinter {    
        pub fun Mint(recipient: &{CertifilyCollectionPublic},content:String, insitution:String, description:String,previewContent:String,certType:UInt8) {
            let token <- create NFT(id: Certifily.totalSupply, content:content, insitution:insitution, description:description, holder: recipient.owner?.address,previewContent:previewContent, certType:certType)
            emit Mint(id:Certifily.totalSupply,content:content,owner: recipient.owner?.address, insitution:insitution)
            recipient.deposit(token: <- token)
            Certifily.totalSupply = Certifily.totalSupply + 1 as UInt64
        } 
    }

    // This is used to create the empty collection. without this address cannot access our NFT token
    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <- create Certifily.Collection()
    }

    // Contract init
    init() {

        // total supply is zero at the time of contract deployment
        self.totalSupply = 0

        self.certifilyStoragePath = /storage/CertifilyNFTCollection

        self.certifilyPublicPath = /public/CertifilyNFTPublicCollection

        self.certifilyMinterPath = /storage/CertifilyNFTMinter

        self.account.save(<-self.createEmptyCollection(), to: self.certifilyStoragePath)

        self.account.link<&{CertifilyCollectionPublic}>(self.certifilyPublicPath, target:self.certifilyStoragePath)

        // store a minter resource in account storage
        self.account.save(<-create NFTMinter(), to: self.certifilyMinterPath)

        emit ContractInitialized()

    }

}
