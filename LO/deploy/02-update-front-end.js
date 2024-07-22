const { ethers, network } = require("hardhat")
const fs = require("fs")
const frontEndContractsFile = "../nxt/constants/contractAddresses.json"
const frontEndAbiFile = "../nxt/constants/abi.json"
module.exports = async function () {

        if(process.env.UPDATE_FRONT_END){
            console.log("updating front end")
            updateContractAddresses()
            console.log("hiiii ")
            updateAbi()
            console.log("front end written")
        }


}

async function updateAbi(){
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(frontEndAbiFile, raffle.interface.format(ethers.utils.FormatTypes.json))
} 

async function updateContractAddresses(){
    const raffle = await ethers.getContract("Raffle")
    const contractAddressesses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    const chainId = network.config.chainId.toString()
    if (chainId in contractAddressesses) {
        if(!contractAddressesses[chainId].includes(raffle.address)){

            contractAddressesses[chainId].push(raffle.address)
        }
    }
    else {
        contractAddressesses[chainId] = [raffle.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddressesses))
}

module.exports.tags = ["all", "frontend"]