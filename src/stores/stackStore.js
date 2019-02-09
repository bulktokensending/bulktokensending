import { action, observable } from "mobx";

class StackStore {
  @observable addresses = []
  @observable onlyAddresses = []
  constructor(rootStore) {
    this.stackStore = rootStore.stackStore
    this.web3Store = rootStore.web3Store
    this.count = 0;
    this.password = '';
    this.interval = null;
  }

  @action
  async reset() {
    this.addresses = [];
    this.onlyAddresses = [];
    this.count = 0;
    this.password = '';
    clearInterval(this.interval);
  }

  @action
  setCount(count) {
    this.count = Number(count).valueOf();
  }

  @action
  setPassword(password) {
    this.password = password;
  }

  @action
  doGeneration(){
    let $this = this;
    const interval = setInterval(() => {
      //addresses here we need to generate, then add to index
      if(this.addresses.length < this.count) {
        clearInterval(interval);
        setTimeout(() => {
          let wallet_worker = new Worker("generate-wallet.js");
          wallet_worker.postMessage({"newPassword": this.password});

          wallet_worker.addEventListener('message', function(event) {
            $this.addresses.push({"address": event.data.address, "v3json": event.data.v3json});
            $this.onlyAddresses.push(event.data.address);
            wallet_worker = null;
            $this.doGeneration();
          });
        }, 1000);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    this.interval = interval;
  }
}

export default StackStore;
