import { Button } from "@web3uikit/core"
import { useEffect } from "react"
import { useMoralis } from "react-moralis"
//mine
export default function ManualHeader(){


    const {enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading   } = useMoralis()

        useEffect(() => {
            if(isWeb3Enabled) return //single statement
            if(typeof window !== "undefined"){

                if(window.localStorage.getItem("connected")){
                    enableWeb3()
                }
            }
            //enableWeb3()
        }, [isWeb3Enabled])

        useEffect(() => {
            Moralis.onAccountChanged((account) => {
                if(account == null){
                    window.localStorage.removeItem("connected")
                    deactivateWeb3() // set web3enabled to false bcoz 
                }
            }
            )
        }, [])

    return(
        <div className=" p-3 border-b-2 border-blue-600/20 flex flex-row bg-blue-200/20">  <h1 className="py-4 px-4 font-bold text-3xl"> Lottery </h1> 
           { account ? (<div className="ml-auto py-2 px-4 font-bold text-2xl mt-3">Connected to {account.slice(0,6)}...{account.slice(account.length - 4)}</div>) : (  <div className="ml-auto mt-3" ><button className="bg-white/80 text-blue-500  py-1 px-6 text-lg font-bold rounded-full border-2 border-blue-400/50 hover:border-white/80 " onClick={async() => {await enableWeb3() 
             if(typeof window !== "undefined") {
             window.localStorage.setItem("connected", "injected")} } } 
             disabled={isWeb3EnableLoading}
             >Connect</button> </div>)}
            
             </div>
    )
}