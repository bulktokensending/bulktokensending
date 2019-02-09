import Web3Store from './web3Store'
import TokenStore from './tokenStore';
import GasPriceStore from './gasPriceStore';
import TxStore from './txStore';
import StackStore from './stackStore';

class UiStore {
  constructor() {
    this.gasPriceStore = new GasPriceStore()
    this.web3Store = new Web3Store(this)
    this.tokenStore = new TokenStore(this)
    this.txStore = new TxStore(this)
    this.stackStore = new StackStore(this)
  }
}

export default new UiStore();
