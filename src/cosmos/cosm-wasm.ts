import {
  CosmWasmClient,
  Secp256k1HdWallet,
  setupWebKeplr,
  SigningCosmWasmClient
} from 'cosmwasm'

const TAG = 'Cosmwasm'

const Config = {
  chainId: 'wasm',
  rpcEndpoint: 'http://192.168.1.19:26657',
  prefix: 'wasm'
}

export default class Cosmwasm {
  private client: CosmWasmClient | null = null
  private signingClient: SigningCosmWasmClient | null = null
  private keplrClient: SigningCosmWasmClient | null = null
  public async connect() {
    this.client = await CosmWasmClient.connect(Config.rpcEndpoint)
    console.log(TAG, 'connect', this.client)
    return this.client
  }
  // public async createWallet(mnemonic: string) {
  //   const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic)
  //   this.signingClient = await SigningCosmWasmClient.connectWithSigner(
  //     Config.rpcEndpoint,
  //     wallet
  //   )
  //   console.log(TAG, 'createWallet', this.signingClient)
  //   return this.signingClient
  // }
  // public async setupWebKeplr() {
  //   this.keplrClient = await setupWebKeplr(Config)
  //   console.log(TAG, 'setupWebKeplr', this.keplrClient)
  //   return this.keplrClient
  // }

  // public async getBalance() {
  //   this.keplrClient?.getBalance(this.signingClient?.getAccount());
  // }
}
