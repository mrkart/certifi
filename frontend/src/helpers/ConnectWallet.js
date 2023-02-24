import * as fcl from "@onflow/fcl";

export async function connectBlocto(){
    try {
        const res = await fcl.logIn()
        let provider = res && res.services && res.services && res.services[0] && res.services[0].provider && res.services[0].provider.name
        if (res && res.addr) {
            let obj = {
                walletAddress: res && res.addr,
                walletProvider: provider
            }
            return obj
        }else{
            
            return Promise.reject("Something went wrong. Couldn't connect your wallet")
        }
    }catch(err){
        if((err && err.toLowerCase().includes('declined'))){
            return Promise.reject('User rejected signature')
        }
        return Promise.reject(err)
    }
}
export function isConnectWallet(){
    let useraddress = ""
    if(window.sessionStorage.getItem("CURRENT_USER"))
    useraddress=JSON.parse(window.sessionStorage.getItem("CURRENT_USER"))["addr"];
    if(useraddress && useraddress != null ){
        return true
    }
    else{
        return false
     }

}