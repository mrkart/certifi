
import {config} from "@onflow/fcl"


console.log(process.env.REACT_APP_ACCESS_NODE)

config()
.put("accessNode.api", process.env.REACT_APP_ACCESS_NODE) // Configure FCL's Access Node  
.put("discovery.wallet", process.env.REACT_APP_WALLET_DISCOVERY) // Configure FCL's Wallet Discovery mechanism  
.put("flow.network", "testnet")
.put("app.detail.icon", "https://devnft.disrupt.art/logo512.png")
.put("app.detail.title", "DisruptArt") 
.put("discovery.wallet.method.default","POP/RPC")



