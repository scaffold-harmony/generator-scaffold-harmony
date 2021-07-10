import React, {Component} from "react";
import {Unit} from "@harmony-js/utils";
import {configs, getHarmony} from "./harmony"
import SimpleStorageContract from "./contracts/SimpleStorage.json";

import "./App.css";
import logo from "./logo.png";

class App extends Component {
  state = {
    storageValue: 'Loading...',
    inputValue: '',
    network: '',
    config: {},
    harmony: null,
    account: {},
    contract: null
  };

  componentDidMount = async () => {
    try {
      const network = process.env.REACT_APP_HARMONY_NETWORK || 'localnet';
      const config = configs[network];
      const harmony = await getHarmony(config);
      const account = await harmony.login();

      // Get the contract instance.
      const deployedNetwork = SimpleStorageContract.networks[config.Network_ID];
      const instance = harmony.contracts.createContract(
        SimpleStorageContract.abi,
        deployedNetwork.address,
      );

      // Set initial state
      this.setState({
        network,
        config,
        harmony,
        account: account,
        contract: instance
      }, this.init);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load harmony, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  init = async () => {
    const response = await this.state.contract.methods.get().call();
    this.setState({
      storageValue: response.toString()
    })
  }

  setStorage = async (value) => {
    const {account, contract} = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(parseInt(value)).send({
      from: account,
      gasLimit: '1000001',
      gasPrice: new Unit('10').asGwei().toWei(),
    });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({
      storageValue: response.toString()
    });
  };

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleSubmit = async (e) => {
    this.setState({
      formDisabled: true
    });
    await this.setStorage(this.state.inputValue)
    this.setState({
      formDisabled: false,
      inputValue: ''
    });
  }

  render() {
    if (!this.state.harmony) {
      return <div>Loading Harmony, accounts, and contract...</div>;
    }
    return (
      <div className="flex-container">
        <div className="row">
          <div className="flex-item"><img alt="logo" className="logo" src={logo} /></div>
          <h1 className="flex-item">Good to Go!</h1>
          <div className="flex-item">Your Scaffold Harmony is installed and ready.</div>
          <div className="flex-item">Network: {this.state.network}</div>
          <div className="flex-item">RPC: {this.state.config.Chain_URL}</div>
          <h2 className="flex-item">Smart Contract Example</h2>
          <div className="flex-item">Your current account: {this.state.account.address}</div>
          <div className="flex-item">The contract address is: {this.state.contract.address}</div>
          <div className="flex-item">The stored value is: {this.state.storageValue}</div>
          <div className="flex-item">
            <span>Set storage: </span>
            <input type="number" value={this.state.inputValue} onChange={this.handleInputChange} disabled={this.state.formDisabled} />
            <input type="button" onClick={this.handleSubmit} disabled={this.state.formDisabled} value={this.state.formDisabled ? 'Waiting for transaction to be confirmed...' : 'Submit'} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
