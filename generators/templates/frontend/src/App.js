import React, { Component } from "react";
import { HarmonyExtension } from "@harmony-js/core";
import { Messenger } from "@harmony-js/network";
import { ChainID, ChainType, Unit } from "@harmony-js/utils";
import SimpleStorageContract from "./contracts/SimpleStorage.json";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      const harmony = await new HarmonyExtension(window.onewallet, {
        chainType: ChainType.Harmony,
        chainId: ChainID.HmyTestnet,
      });
      harmony.setProvider("https://api.s0.b.hmny.io");
      harmony.setMessenger(new Messenger(harmony.provider, ChainType.Harmony, ChainID.HmyTestnet));

      // Use web3 to get the user's accounts.
      const account = await harmony.login();

      // Get the contract instance.
      const networkId = "1666700000";
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = harmony.contracts.createContract(
        SimpleStorageContract.abi,
        deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ harmony, accounts: [account], contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load harmony, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({
      from: accounts[0],
      gasLimit: '1000001',
      gasPrice: new Unit('10').asGwei().toWei(),
    });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response.toString() });
  };

  render() {
    if (!this.state.harmony) {
      return <div>Loading Harmony, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Scaffold Harmony is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 48</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
