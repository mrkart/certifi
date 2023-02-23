import { config } from '@onflow/fcl';
import { send as httpSend } from '@onflow/transport-http';

config()
    // Configure FCL's Data transport
    .put('sdk.transport', httpSend)
    // Configure FCL's Access Node
    .put('accessNode.api', process.env.FLOW_ACCESS_NODE)
    // Configure FCL's Wallet Discovery mechanism
    .put('discovery.wallet', process.env.FLOW_WALLET_DISCOVERY)
    // Contract placeholders
    .put('0xCERTIFILYADDRESS', process.env.FLOW_CONTRACT_ADDRESS);
