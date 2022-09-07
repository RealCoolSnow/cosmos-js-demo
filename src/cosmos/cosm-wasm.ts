import {
  coins,
  CosmWasmClient,
  Decimal,
  GasPrice,
  QueryClient,
  Secp256k1HdWallet,
  setupAuthExtension,
  SigningCosmWasmClient
} from 'cosmwasm'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
const TAG = 'Cosmwasm'

const Config = {
  chainId: 'wasm',
  rpcEndpoint: 'http://192.168.1.19:26657',
  prefix: 'wasm',
  denom: 'stake'
}

const mnemonic =
  'wrist people bulk assume bag jump afraid runway advice banana bridge sketch'

export default class Cosmwasm {
  private client: CosmWasmClient | null = null
  private signingClient: SigningCosmWasmClient | null = null
  private keplrClient: SigningCosmWasmClient | null = null
  private address = ''
  public async connect() {
    this.client = await CosmWasmClient.connect(Config.rpcEndpoint)
    console.log(TAG, 'connect -> block height:', await this.client.getHeight())
    return this.client
  }
  public async createWallet(mnemonic: string) {
    const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: Config.prefix
    })
    this.signingClient = await SigningCosmWasmClient.connectWithSigner(
      Config.rpcEndpoint,
      wallet,
      {
        gasPrice: new GasPrice(Decimal.fromAtomics('1', 0), Config.denom)
      }
    )
    this.address = (await wallet.getAccounts())[0].address
    console.log(TAG, 'createWallet -> ', this.address)
    return this.signingClient
  }

  public async getBalance() {
    const balance = await this.signingClient?.getBalance(
      this.address,
      Config.denom
    )
    console.log(TAG, 'getBalance -> ', balance)
    return balance
  }

  // public async getBalance() {
  //   this.keplrClient?.getBalance(this.signingClient?.getAccount());
  // }
  public async test() {
    await this.connect()
    await this.createWallet(mnemonic)
    await this.getBalance()
    //---- send token
    // const memo = `Test tx ${Date.now()}`
    // const result = await this.signingClient?.sendTokens(
    //   this.address,
    //   this.address,
    //   coins(20, Config.denom),
    //   'auto',
    //   memo
    // )
    // console.log(TAG, 'sendTokens', result)
    //---- query
    const txHash =
      'EA74DF98FFA3E157993942FE199DC025F6B6A74845F506340B61F4921DAC6D56'
    const tx = await this.signingClient?.getTx(txHash)
    console.log(TAG, 'getTx', tx)
    const searchTx = await this.signingClient?.searchTx({ height: 173058 })
    console.log(TAG, 'searchTx', searchTx)
    const getCodes = await this.signingClient?.getCodes()
    console.log(TAG, 'getCodes', getCodes)
    const getContract = await this.signingClient?.getContract(
      'wasm18cszlvm6pze0x9sz32qnjq4vtd45xehqs8dq7cwy8yhq35wfnn3qyncxd2'
    )
    console.log(TAG, 'getContract', getContract)
    const msgAny = {
      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
      value: 'hello world'
    }
    const fee = {
      amount: coins(100, Config.denom),
      gas: '20'
    }
    const signed = await this.signingClient?.sign(
      this.address,
      [msgAny],
      fee,
      'test sign'
    )
    const result = await this.signingClient?.broadcastTx(
      Uint8Array.from(TxRaw.encode(signed!).finish())
    )
    console.log(TAG, 'broadcastTx', result)
  }
}
