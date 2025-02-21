// utils/Contracts.ts
import { BrowserProvider, JsonRpcSigner, Contract } from "ethers";
import { ContractAddresses } from "../types/Contracts";
import BETTING_POOL_ABI from "../ABI/BettingPool.json";
import TOURNAMENT_ABI from "../ABI/Tournament.json";
import COMMUNITY_HUB_ABI from "../ABI/CommunityHub.json";
import WETH_ABI from "../ABI/WETH.json";

export class ContractService {
  private provider: BrowserProvider;
  private signer: JsonRpcSigner | null = null;
  private addresses: ContractAddresses;

  constructor(addresses: ContractAddresses) {
    if (!window.ethereum) {
      throw new Error("Ethereum provider not found");
    }
    this.provider = new BrowserProvider(window.ethereum);
    this.addresses = addresses;
  }
  get getSigner() {
    return this.signer;
  }
  async init(): Promise<void> {
    const network = await this.provider.getNetwork();
    console.log("Connected to network:", {
      chainId: network.chainId,
      name: network.name
    });
    this.signer = await this.provider.getSigner();
  }
 
  async getContracts() {
    if (!this.signer) {
      throw new Error("Signer not initialized");
    }
    // console.log("Signer:", this.signer);

    return {
      bettingPool: new Contract(
        this.addresses.bettingPool,
        BETTING_POOL_ABI.abi,
        this.signer
      ),
      tournament: new Contract(
        this.addresses.tournament,
        TOURNAMENT_ABI.abi,
        this.signer
      ),
      communityHub: new Contract(
        this.addresses.communityHub,
        COMMUNITY_HUB_ABI.abi,
        this.signer
      ),
      wethToken: new Contract(
        this.addresses.weth, 
        WETH_ABI.abi, 
        this.signer
      ),
    };
  }
}