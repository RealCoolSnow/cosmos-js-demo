import { CosmWasmClient } from 'cosmwasm'

export default class Cosmwasm {
  private readonly rpcEndpoint = 'http://rpc.cliffnet.cosmwasm.com:443/'
  private client: CosmWasmClient | null = null
  public async connect() {
    this.client = await CosmWasmClient.connect(this.rpcEndpoint)
    console.log('connect', this.client)
    return this.client
  }
}
