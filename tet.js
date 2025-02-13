import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider("https://rpcv2-testnet.ancient8.gg/"); 
const contractAddress = "0x792f1fB27F6B61f030469acdCf397c8444d6BF2B";
const abi = [
    "function nextMatchId() public view returns (uint256)"
];

async function checkContract() {
    const contract = new ethers.Contract(contractAddress, abi, provider);
    try {
        const matchId = await contract.nextMatchId();
        console.log("Next Match ID:", matchId.toString());
    } catch (error) {
        console.error("Error fetching nextMatchId:", error);
    }
}

checkContract();
