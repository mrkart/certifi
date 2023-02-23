import * as fcl from "@onflow/fcl"
import {Buffer} from 'buffer'


export const signMessage = async () => {
  const MSG = Buffer.from("create certificate").toString("hex")
  try {
    return await fcl.currentUser.signUserMessage(MSG)
  } catch (error) {
    console.log(error)
  }}

