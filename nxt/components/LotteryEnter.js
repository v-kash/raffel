import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Button, useNotification } from "@web3uikit/core"
import {Btc} from '@web3uikit/icons'


export default function LotteryEnter() {
    const { chainId : chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [entranceFee, setEntranceFee] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    console.log(raffleAddress)
    const dispatch = useNotification()

    const {runContractFunction : enterRaffle, isLoading, isFetching} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const {runContractFunction : getEntranceFee} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {}, 
    })

    const {runContractFunction : getNumberOfPlayers} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {}, 
    })

    const {runContractFunction : getRecentWinner} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {}, 
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numberOfPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = (await getRecentWinner())
        setEntranceFee(entranceFeeFromCall)
        setNumberOfPlayers(numberOfPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if(isWeb3Enabled){
                
                updateUI() 
        }

    }, [isWeb3Enabled])

    const handleSuccess = async function (tx){
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete !",
            title: "Tx Notification",
            position: "topR",
            icon: <Btc fontSize='20px'/>,
        })
    }

    return(
        <div className="p-5" >  <div className="font-mono font-semibold text-2xl pb-2 text-black/70 ">Hii from Lottery Entrance ! </div>
        
            { raffleAddress ? <div> 
                                <button className="bg-white/70  text-blue-500 font-bold py-2 px-6 rounded-full border-2 border-blue-400/50 hover:bg-blue-400/10 ml-auto" onClick={async function() {await enterRaffle({ onSuccess: handleSuccess,
                                                                                        onError: (error) => console.log(error) }) }} disabled={ isLoading || isFetching }> { isLoading || isFetching ? <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div> : <div> Enter Raffle</div> }  </button>
                
                <div className="font-semibold pt-2" >Entrance Fee :{ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>  
                <div className="font-semibold">No of Players : {numberOfPlayers}</div>
               <div className="font-semibold"> Recent Winner :{recentWinner} </div>
                
                </div> : <div className="font-semibold text-lg text-red-600 py-4" > No Raffle Address Detected ! Please Connect Your Metamask Wallet</div>}



             </div>
    )
}