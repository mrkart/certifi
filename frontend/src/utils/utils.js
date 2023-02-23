export const getUserAddress = async () => {

    let useraddress = ""
 
    if (window.sessionStorage.getItem("CURRENT_USER"))
       useraddress = JSON.parse(window.sessionStorage.getItem("CURRENT_USER"))["addr"];
 
    return useraddress
 
 }